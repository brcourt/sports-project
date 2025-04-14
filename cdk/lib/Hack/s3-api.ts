import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import type * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as kms from "aws-cdk-lib/aws-kms";
import * as logs from "aws-cdk-lib/aws-logs";
import * as path from "node:path";
import type * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment";

import {
  Certificate,
  type ICertificate,
} from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";
import { CfnOutput } from "aws-cdk-lib";
import type { Bucket, IBucket } from "aws-cdk-lib/aws-s3";

interface HackProps extends cdk.StackProps {
  websiteBucket: Bucket;
  domainName: string;
  domainCert: ICertificate;
}

export class Hack extends Construct {
  constructor(scope: Construct, id: string, props: HackProps) {
    super(scope, id);

    // Grab the web application's files for deployment. Bucket naming is dynamic based on account id
    new s3Deploy.BucketDeployment(this, "hack-ui-deployment", {
      sources: [
        s3Deploy.Source.asset(path.join(__dirname, "../../../frontend/dist")),
      ],
      destinationBucket: props.websiteBucket,
    });

    // API Gateway to proxy S3 bucket get (to enable DNS and SSL later) with logging

    const websiteGateway = new apiGateway.RestApi(this, "hack-ui-gateway", {
      description:
        "Provides the static website and content from the hack-website-assets s3 bucket.",
      binaryMediaTypes: ["*/*"],
      endpointConfiguration: {
        types: [apiGateway.EndpointType.REGIONAL],
      },
      deployOptions: {
        stageName: "v1",
        metricsEnabled: true,
      },
    });

    websiteGateway.addDomainName("customDomain", {
      domainName: props.domainName,
      certificate: props.domainCert,
    });

    new apiGateway.RequestValidator(this, "DefaultValidator", {
      restApi: websiteGateway,
      validateRequestBody: true,
      validateRequestParameters: true,
    });

    // IAM Role for allowing API Gateway to read from the website's S3 bucket and decrypt the data
    const gatewayExecutionRole = new iam.Role(
      this,
      "hack-gateway-s3-assume-role",
      {
        assumedBy: new iam.ServicePrincipal("apigateway.amazonaws.com"),
        inlinePolicies: {
          S3Access: new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                resources: [
                  props.websiteBucket.bucketArn,
                  props.websiteBucket.arnForObjects("*"),
                ],
                actions: ["s3:ListBucket", "s3:GetObject"],
              }),
            ],
          }),
        },
      }
    );

    const reactRoutes = websiteGateway.root.addProxy({ anyMethod: false });
    const assetsUrl = websiteGateway.root
      .addResource("static")
      .addProxy({ anyMethod: false });
    const remotesResource = websiteGateway.root
      .addResource("remotes")
      .addProxy({ anyMethod: false });

    new CfnOutput(this, "UiEndpoint", {
      value:
        websiteGateway.domainName?.domainNameAliasDomainName ??
        websiteGateway.url,
    });

    /*
      Routes:
        / -> Gets index.html
        /static/{proxy+} -> Gets web app static assets from s3
        /{proxy+} -> gets index.html through Proxy+
        /remotes/{proxy+} -> Gets remote assets from s3
    */

    this.addS3GetMethod(
      websiteGateway.root,
      props.websiteBucket,
      gatewayExecutionRole,
      true
    );
    this.addS3GetMethod(
      reactRoutes,
      props.websiteBucket,
      gatewayExecutionRole,
      true
    );
    this.addS3GetMethod(
      assetsUrl,
      props.websiteBucket,
      gatewayExecutionRole,
      false
    );
    this.addS3GetMethod(
      remotesResource,
      props.websiteBucket,
      gatewayExecutionRole,
      false
    );
  }

  addS3GetMethod(
    resource: apiGateway.IResource,
    bucket: s3.IBucket,
    integrationRole: iam.IRole,
    redirectToIndex: boolean
  ) {
    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let path;
    if (redirectToIndex) {
      path = `${bucket.bucketName}/{objectname}`;
    } else {
      path = `${bucket.bucketName}/${resource.path.split("/")[1]}/{objectname}`;
    }

    const s3Integration = new apiGateway.AwsIntegration({
      service: "s3",
      integrationHttpMethod: "GET",
      path: path,
      options: {
        credentialsRole: integrationRole,
        requestParameters: {
          "integration.request.path.objectname": redirectToIndex
            ? "'index.html'"
            : "method.request.path.proxy",
          "integration.request.header.Accept": "method.request.header.Accept",
        },
        integrationResponses: [
          {
            selectionPattern: "2\\d\\d",
            statusCode: "200",
            responseParameters: {
              "method.response.header.Content-Type":
                "integration.response.header.Content-Type",
              "method.response.header.Content-Length":
                "integration.response.header.Content-Length",
              "method.response.header.ETag": "integration.response.header.ETag",
              "method.response.header.Last-Modified":
                "integration.response.header.Last-Modified",
            },
          },
          {
            selectionPattern: "404",
            statusCode: "404",
            responseParameters: {
              "method.response.header.Content-Type":
                "integration.response.header.Content-Type",
              "method.response.header.Content-Length":
                "integration.response.header.Content-Length",
            },
          },
          {
            selectionPattern: "4\\d\\d",
            statusCode: "400",
            responseParameters: {
              "method.response.header.Content-Type":
                "integration.response.header.Content-Type",
              "method.response.header.Content-Length":
                "integration.response.header.Content-Length",
            },
          },
          {
            selectionPattern: "5\\d\\d",
            statusCode: "500",
            responseParameters: {
              "method.response.header.Content-Type":
                "integration.response.header.Content-Type",
              "method.response.header.Content-Length":
                "integration.response.header.Content-Length",
            },
          },
        ],
      },
    });

    resource.addMethod("GET", s3Integration, {
      requestParameters: {
        "method.request.path.proxy": true,
        "method.request.header.Accept": false,
      },

      methodResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Content-Type": false,
            "method.response.header.Content-Length": false,
            "method.response.header.ETag": false,
            "method.response.header.Last-Modified": false,
          },
        },
        {
          statusCode: "400",
          responseParameters: {
            "method.response.header.Content-Type": false,
            "method.response.header.Content-Length": false,
          },
        },
        {
          statusCode: "404",
          responseParameters: {
            "method.response.header.Content-Type": false,
            "method.response.header.Content-Length": false,
          },
        },
        {
          statusCode: "500",
          responseParameters: {
            "method.response.header.Content-Type": false,
            "method.response.header.Content-Length": false,
          },
        },
      ],
    });
  }
}

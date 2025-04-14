import { Construct } from "constructs";
import { CfnOutput, Duration, RemovalPolicy } from "aws-cdk-lib";
import type { ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import { Bucket, BucketEncryption, HttpMethods } from "aws-cdk-lib/aws-s3";
import {
  Distribution,
  OriginAccessIdentity,
  // SecurityPolicyProtocol,
  // AllowedMethods,
  // ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
// import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";

interface StorageProps {
  domainName: string;
  domainCert: ICertificate;
}

export class Storage extends Construct {
  public readonly websiteBucket: Bucket;
  public readonly contentBucket: Bucket;
  public readonly distribution: Distribution;

  constructor(scope: Construct, id: string, props: StorageProps) {
    super(scope, id);

    // Need an S3 bucket to deploy the frontend application to.
    this.websiteBucket = new Bucket(this, "sports-courtney-cloud-bucket", {
      bucketName: "sports-courtney-cloud-dev",
      encryption: BucketEncryption.S3_MANAGED,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,

      // Website configuration is added here because my stupid AWS account
      // isn't letting me create any new CloudFront distributions right now...
      // Quote Exceeded - contact AWS support.
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
    });

    /* My AWS account is not allowed to create distributions right now. Apparantly I've hit some sort of limit... */

    // // Configure CloudFront
    // const cloudfrontOAI = new OriginAccessIdentity(this, "cloudfront-OAI", {
    //   comment: "OAI for Sports",
    // });

    // // Grant access to cloudfront
    // this.websiteBucket.addToResourcePolicy(
    //   new iam.PolicyStatement({
    //     actions: ["s3:GetObject"],
    //     resources: [this.websiteBucket.arnForObjects("*")],
    //     principals: [
    //       new iam.CanonicalUserPrincipal(
    //         cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
    //       ),
    //     ],
    //   })
    // );

    // //CloudFront distribution
    // this.distribution = new Distribution(this, "SiteDistribution", {
    //   certificate: props.domainCert,
    //   defaultRootObject: "index.html",
    //   domainNames: [props.domainName],
    //   minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
    //   errorResponses: [
    //     {
    //       httpStatus: 403,
    //       responseHttpStatus: 200,
    //       responsePagePath: "/index.html",
    //       ttl: Duration.minutes(30),
    //     },
    //     {
    //       httpStatus: 404,
    //       responseHttpStatus: 200,
    //       responsePagePath: "/index.html",
    //       ttl: Duration.minutes(30),
    //     },
    //   ],
    //   defaultBehavior: {
    //     origin: new origins.S3Origin(this.websiteBucket, {
    //       originAccessIdentity: cloudfrontOAI,
    //     }),
    //     compress: true,
    //     allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
    //     viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    //   },
    // });

    // Outputs
    new CfnOutput(this, "WebsiteBucket", {
      value: this.websiteBucket.bucketName,
    });
    // new CfnOutput(this, "DistributionId", {
    //   value: this.distribution.distributionId,
    // });
  }
}

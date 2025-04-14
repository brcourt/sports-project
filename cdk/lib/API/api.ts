import { Construct } from "constructs";
import { CfnOutput, Duration } from "aws-cdk-lib";
import {
  HttpApi,
  HttpStage,
  DomainName,
  CorsHttpMethod,
} from "aws-cdk-lib/aws-apigatewayv2";
import type { ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import { Bucket, HttpMethods } from "aws-cdk-lib/aws-s3";
import { HttpUserPoolAuthorizer } from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import { HttpUrlIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import type { IUserPool, IUserPoolClient } from "aws-cdk-lib/aws-cognito";
import { StringParameter, IStringParameter } from "aws-cdk-lib/aws-ssm";
import type { Table } from "aws-cdk-lib/aws-dynamodb";
import { PlayerRoutes } from "./routes/players/playerRoutes";
import { GameRoutes } from "./routes/games/gameRoutes";
import { TeamRoutes } from "./routes/teams/teamRoutes";

interface ApiProps {
  domainName: string;
  domainCert: ICertificate;
  userPool: IUserPool;
  appClient: IUserPoolClient;
  table: Table;
}

export class Api extends Construct {
  public readonly api: HttpApi;

  constructor(scope: Construct, id: string, props: ApiProps) {
    const { domainName, domainCert, userPool, appClient, table } = props;
    super(scope, id);

    const apiDomainName = new DomainName(this, "DN", {
      domainName: `api.${domainName}`,
      certificate: domainCert,
    });

    const authorizer = new HttpUserPoolAuthorizer(
      "CognitoAuthorizer",
      userPool,
      {
        userPoolClients: [appClient],
      }
    );

    // API
    this.api = new HttpApi(this, "SportsApi", {
      defaultAuthorizer: authorizer,
      defaultDomainMapping: {
        domainName: apiDomainName,
      },
      corsPreflight: {
        allowHeaders: ["Authorization", "Content-Type"],
        allowCredentials: true,
        allowMethods: [
          CorsHttpMethod.GET,
          CorsHttpMethod.HEAD,
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.DELETE,
        ],
        allowOrigins: ["http://localhost:3000", "https://www.courtney.cloud"],
        maxAge: Duration.days(10),
      },
    });

    // stage
    new HttpStage(this, "Stage", {
      httpApi: this.api,
      stageName: "dev",
    });

    new PlayerRoutes(this, "PlayerRoutes", {
      api: this.api,
      table: table,
      authorizer,
    });

    new GameRoutes(this, "GameRoutes", {
      api: this.api,
      table: table,
      authorizer,
    });

    new TeamRoutes(this, "TeamRoutes", {
      api: this.api,
      table: table,
      authorizer,
    });

    // Outputs
    new CfnOutput(this, "Api", { value: `https://${apiDomainName.name}` });
  }
}

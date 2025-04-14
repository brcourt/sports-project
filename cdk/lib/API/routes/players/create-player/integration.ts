import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { Duration } from "aws-cdk-lib";
import * as path from "node:path";
import { HttpMethod } from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import type { ApiEndpointProps } from "../playerRoutes";

const methodName = "CreatePlayer";

export class CreatePlayer extends Construct {
  constructor(scope: Construct, id: string, props: ApiEndpointProps) {
    super(scope, id);
    const { table, api, authorizer } = props;

    // Lambda Function
    const CreatePlayerFunction = new NodejsFunction(
      this,
      "CreatePlayerFunction",
      {
        runtime: Runtime.NODEJS_22_X,
        entry: path.join(__dirname, "./handler.ts"),
        handler: "handler",
        memorySize: 256,
        timeout: Duration.seconds(15),
        tracing: Tracing.ACTIVE,
        environment: {
          tableName: table.tableName,
          LAMBDA_PURPOSE: methodName,
        },
      }
    );

    // Table Permissions
    table.grantReadWriteData(CreatePlayerFunction);

    // API Integration
    api.addRoutes({
      path: "/player",
      methods: [HttpMethod.PUT],
      integration: new HttpLambdaIntegration(
        "CreatePlayersIntegration",
        CreatePlayerFunction
      ),
      authorizer,
    });
  }
}

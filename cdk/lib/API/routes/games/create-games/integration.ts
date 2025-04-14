import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { Duration } from "aws-cdk-lib";
import * as path from "node:path";
import { HttpMethod } from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import type { ApiEndpointProps } from "../gameRoutes";

const methodName = "CreateGame";

export class CreateGame extends Construct {
  constructor(scope: Construct, id: string, props: ApiEndpointProps) {
    super(scope, id);
    const { table, api, authorizer } = props;

    // Lambda Function
    const CreateGameFunction = new NodejsFunction(this, "CreateGameFunction", {
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
    });

    // Table Permissions
    table.grantReadWriteData(CreateGameFunction);

    // API Integration
    api.addRoutes({
      path: "/game",
      methods: [HttpMethod.PUT],
      integration: new HttpLambdaIntegration(
        "CreateGameIntegration",
        CreateGameFunction
      ),
      authorizer,
    });
  }
}

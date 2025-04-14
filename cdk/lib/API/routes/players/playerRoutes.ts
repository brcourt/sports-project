import { Construct } from "constructs";
import type { Table } from "aws-cdk-lib/aws-dynamodb";
import type { HttpUserPoolAuthorizer } from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import type { HttpApi } from "aws-cdk-lib/aws-apigatewayv2";

// Method Functions
import { GetPlayer } from "./get-player/integration";
import { CreatePlayer } from "./create-player/integration";

export interface ApiEndpointProps {
  table: Table;
  api: HttpApi;
  authorizer: HttpUserPoolAuthorizer;
}

export class PlayerRoutes extends Construct {
  constructor(scope: Construct, id: string, props: ApiEndpointProps) {
    super(scope, id);

    // playerRoutes
    new GetPlayer(this, "GetPlayerRoute", props);
    new CreatePlayer(this, "CreatePlayerRoute", props);
  }
}

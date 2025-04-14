import { Construct } from "constructs";
import type { Table } from "aws-cdk-lib/aws-dynamodb";
import type { HttpUserPoolAuthorizer } from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import type { HttpApi } from "aws-cdk-lib/aws-apigatewayv2";

// Method Functions
import { GetGames } from "./get-games/integration";
import { CreateGame } from "./create-games/integration";

export interface ApiEndpointProps {
  table: Table;
  api: HttpApi;
  authorizer: HttpUserPoolAuthorizer;
}

export class GameRoutes extends Construct {
  constructor(scope: Construct, id: string, props: ApiEndpointProps) {
    super(scope, id);

    // gameRoutes
    new GetGames(this, "GetGame", props);
    new CreateGame(this, "CreateGame", props);
  }
}

import { Logger } from "@aws-lambda-powertools/logger";
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyStructuredResultV2,
  Context,
} from "aws-lambda";
import { Player } from "../../../../Database/models/players";
import { MissingArgumentError, NotFoundError } from "../../../utils/errors";
import { okResult, errResult } from "../../../utils/handler-utils";
const logger = new Logger({
  persistentLogAttributes: { purpose: process.env.LAMBDA_PURPOSE || "unknown" },
});

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyStructuredResultV2> {
  // Validate request
  if (typeof process.env.tableName === "undefined")
    throw new Error("tableName Environment variable must be set.");
  const table = process.env.tableName;
  logger.info("Incoming Request", { event });
  logger.info("Context", JSON.stringify(context));

  // Handler Logic
  // TODO: query tenant memberships and ensure that player has access to at least one tenant that requestor has access to
  try {
    const type = "player";
    const playerId = event.pathParameters?.playerId;
    const queryParams = event.queryStringParameters;

    // This is insecure
    const result = playerId
      ? await Player.query.byPlayer({ id: playerId, type }).go({ table })
      : await Player.query.all({ ...queryParams }).go({ table });

    logger.info(JSON.stringify(result));

    if (!result?.data)
      throw new NotFoundError(`No player found with id: ${playerId}`);
    return okResult(result.data);
  } catch (err) {
    logger.error("Error:", err as Error);

    return errResult(err);
  }
}

import { Logger } from "@aws-lambda-powertools/logger";
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyStructuredResultV2,
  Context,
} from "aws-lambda";
import { Game } from "../../../../Database/models/games";
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
  try {
    const type = "game";
    const gameId = event.pathParameters?.gameId;
    const queryParams = event.queryStringParameters;

    // This is insecure
    const result = gameId
      ? await Game.query.byGame({ id: gameId, type }).go({ table })
      : await Game.query.all({ ...queryParams }).go({ table });
    logger.info(JSON.stringify(result));

    if (!result?.data)
      throw new NotFoundError(`No game found with id: ${gameId}`);
    return okResult(result.data);
  } catch (err) {
    logger.error("Error:", err as Error);

    return errResult(err);
  }
}

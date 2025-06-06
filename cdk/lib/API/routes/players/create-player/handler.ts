import { Logger } from "@aws-lambda-powertools/logger";
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyStructuredResultV2,
  Context,
} from "aws-lambda";
import { Player } from "../../../../Database/models/players";
import { okResult, errResult } from "../../../utils/handler-utils";

const logger = new Logger({
  persistentLogAttributes: { purpose: process.env.LAMBDA_PURPOSE || "unknown" },
});

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyStructuredResultV2> {
  // Handler Logic
  try {
    // Submit ElectroDB
    const table = process.env.tableName;
    const result = await Player.put([
      {
        id: "player-001",
        type: "player",
        firstName: "Emma",
        lastName: "Smith",
        age: 11,
        position: "Forward",
        jerseyNumber: 7,
        teamId: "team-001",
        stats: {
          gamesPlayed: 11,
          goalsScored: 8,
          assists: 5,
          yellowCards: 1,
          redCards: 0,
        },
        attendance: [
          { date: "2023-09-05", present: true },
          { date: "2023-09-12", present: true },
          { date: "2023-09-19", present: true },
          { date: "2023-09-26", present: false },
          { date: "2023-10-03", present: true },
          { date: "2023-10-10", present: true },
          { date: "2023-10-17", present: true },
          { date: "2023-10-24", present: true },
          { date: "2023-10-31", present: true },
          { date: "2023-11-07", present: true },
          { date: "2023-11-14", present: true },
        ],
      },
      {
        id: "player-002",
        type: "player",
        firstName: "Noah",
        lastName: "Johnson",
        age: 12,
        position: "Midfielder",
        jerseyNumber: 10,
        teamId: "team-001",
        stats: {
          gamesPlayed: 10,
          goalsScored: 5,
          assists: 7,
          yellowCards: 2,
          redCards: 0,
        },
        attendance: [
          { date: "2023-09-05", present: true },
          { date: "2023-09-12", present: true },
          { date: "2023-09-19", present: false },
          { date: "2023-09-26", present: true },
          { date: "2023-10-03", present: true },
          { date: "2023-10-10", present: true },
          { date: "2023-10-17", present: true },
          { date: "2023-10-24", present: false },
          { date: "2023-10-31", present: true },
          { date: "2023-11-07", present: true },
          { date: "2023-11-14", present: true },
        ],
      },
      {
        id: "player-012",
        type: "player",
        firstName: "Olivia",
        lastName: "Williams",
        age: 11,
        position: "Defender",
        jerseyNumber: 4,
        teamId: "team-002",
        stats: {
          gamesPlayed: 11,
          goalsScored: 1,
          assists: 3,
          yellowCards: 0,
          redCards: 0,
        },
        attendance: [
          { date: "2023-09-05", present: true },
          { date: "2023-09-12", present: true },
          { date: "2023-09-19", present: true },
          { date: "2023-09-26", present: true },
          { date: "2023-10-03", present: true },
          { date: "2023-10-10", present: false },
          { date: "2023-10-17", present: true },
          { date: "2023-10-24", present: true },
          { date: "2023-10-31", present: true },
          { date: "2023-11-07", present: true },
          { date: "2023-11-14", present: true },
        ],
      },
      {
        id: "player-045",
        type: "player",
        firstName: "Liam",
        lastName: "Brown",
        age: 14,
        position: "Forward",
        jerseyNumber: 9,
        teamId: "team-005",
        stats: {
          gamesPlayed: 10,
          goalsScored: 12,
          assists: 4,
          yellowCards: 1,
          redCards: 0,
        },
        attendance: [
          { date: "2023-09-07", present: true },
          { date: "2023-09-14", present: true },
          { date: "2023-09-21", present: true },
          { date: "2023-09-28", present: true },
          { date: "2023-10-05", present: true },
          { date: "2023-10-12", present: false },
          { date: "2023-10-19", present: true },
          { date: "2023-10-26", present: true },
          { date: "2023-11-02", present: true },
          { date: "2023-11-09", present: true },
        ],
      },
    ]).go({ table });

    logger.info("Mock data inserted successfully");

    return okResult({});
  } catch (err) {
    logger.error("Error:", err as Error);

    return errResult(err);
  }
}

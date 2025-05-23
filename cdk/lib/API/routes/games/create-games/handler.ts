import { Logger } from "@aws-lambda-powertools/logger";
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyStructuredResultV2,
  Context,
} from "aws-lambda";
import { Game } from "../../../../Database/models/games";
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
    const result = await Game.put([
      {
        id: "game-001",
        type: "game",
        date: "2023-09-05",
        homeTeam: "team-001",
        awayTeam: "team-002",
        homeScore: 3,
        awayScore: 2,
        location: "Central Park Field",
        division: "U12",
        attendance: 145,
        weatherConditions: "Sunny",
        scorers: [
          { playerId: "player-001", goals: 2, team: "team-001" },
          { playerId: "player-003", goals: 1, team: "team-001" },
          { playerId: "player-012", goals: 1, team: "team-002" },
          { playerId: "player-015", goals: 1, team: "team-002" },
        ],
        referees: ["John Smith", "Maria Garcia"],
      },
      {
        id: "game-002",
        type: "game",
        date: "2023-09-05",
        homeTeam: "team-003",
        awayTeam: "team-004",
        homeScore: 2,
        awayScore: 2,
        location: "Riverside Field",
        division: "U12",
        attendance: 120,
        weatherConditions: "Cloudy",
        scorers: [
          { playerId: "player-023", goals: 1, team: "team-003" },
          { playerId: "player-025", goals: 1, team: "team-003" },
          { playerId: "player-034", goals: 1, team: "team-004" },
          { playerId: "player-037", goals: 1, team: "team-004" },
        ],
        referees: ["David Johnson", "Lisa Wong"],
      },
      {
        id: "game-003",
        type: "game",
        date: "2023-09-07",
        homeTeam: "team-005",
        awayTeam: "team-006",
        homeScore: 4,
        awayScore: 1,
        location: "Central Park Field",
        division: "U14",
        attendance: 165,
        weatherConditions: "Sunny",
        scorers: [
          { playerId: "player-045", goals: 2, team: "team-005" },
          { playerId: "player-047", goals: 1, team: "team-005" },
          { playerId: "player-050", goals: 1, team: "team-005" },
          { playerId: "player-056", goals: 1, team: "team-006" },
        ],
        referees: ["Robert Chen", "Jennifer Lee"],
      },
      {
        id: "game-004",
        type: "game",
        date: "2023-09-07",
        homeTeam: "team-007",
        awayTeam: "team-008",
        homeScore: 3,
        awayScore: 1,
        location: "Riverside Field",
        division: "U14",
        attendance: 130,
        weatherConditions: "Partly Cloudy",
        scorers: [
          { playerId: "player-067", goals: 2, team: "team-007" },
          { playerId: "player-070", goals: 1, team: "team-007" },
          { playerId: "player-078", goals: 1, team: "team-008" },
        ],
        referees: ["Kevin Martinez", "Amanda Taylor"],
      },
      {
        id: "game-005",
        type: "game",
        date: "2023-09-12",
        homeTeam: "team-002",
        awayTeam: "team-003",
        homeScore: 3,
        awayScore: 1,
        location: "Central Park Field",
        division: "U12",
        attendance: 135,
        weatherConditions: "Sunny",
        scorers: [
          { playerId: "player-012", goals: 1, team: "team-002" },
          { playerId: "player-014", goals: 1, team: "team-002" },
          { playerId: "player-016", goals: 1, team: "team-002" },
          { playerId: "player-023", goals: 1, team: "team-003" },
        ],
        referees: ["John Smith", "Maria Garcia"],
      },
      {
        id: "game-006",
        type: "game",
        date: "2023-09-12",
        homeTeam: "team-001",
        awayTeam: "team-004",
        homeScore: 4,
        awayScore: 0,
        location: "Riverside Field",
        division: "U12",
        attendance: 140,
        weatherConditions: "Sunny",
        scorers: [
          { playerId: "player-001", goals: 2, team: "team-001" },
          { playerId: "player-002", goals: 1, team: "team-001" },
          { playerId: "player-005", goals: 1, team: "team-001" },
        ],
        referees: ["David Johnson", "Lisa Wong"],
      },
      {
        id: "game-007",
        type: "game",
        date: "2023-09-14",
        homeTeam: "team-006",
        awayTeam: "team-007",
        homeScore: 2,
        awayScore: 2,
        location: "Central Park Field",
        division: "U14",
        attendance: 155,
        weatherConditions: "Partly Cloudy",
        scorers: [
          { playerId: "player-056", goals: 1, team: "team-006" },
          { playerId: "player-059", goals: 1, team: "team-006" },
          { playerId: "player-067", goals: 1, team: "team-007" },
          { playerId: "player-069", goals: 1, team: "team-007" },
        ],
        referees: ["Robert Chen", "Jennifer Lee"],
      },
      {
        id: "game-008",
        type: "game",
        date: "2023-09-14",
        homeTeam: "team-005",
        awayTeam: "team-008",
        homeScore: 5,
        awayScore: 0,
        location: "Riverside Field",
        division: "U14",
        attendance: 145,
        weatherConditions: "Sunny",
        scorers: [
          { playerId: "player-045", goals: 3, team: "team-005" },
          { playerId: "player-048", goals: 1, team: "team-005" },
          { playerId: "player-051", goals: 1, team: "team-005" },
        ],
        referees: ["Kevin Martinez", "Amanda Taylor"],
      },
    ]).go({ table });

    logger.info("Mock data inserted successfully");

    return okResult({});
  } catch (err) {
    logger.error("Error:", err as Error);

    return errResult(err);
  }
}

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Entity, Service } from "electrodb";

const client = new DynamoDBClient({});

export const Game = new Entity(
  {
    model: {
      entity: "game",
      version: "1",
      service: "games",
    },
    attributes: {
      type: {
        type: "string",
        readOnly: true,
        set: () => "game",
      },
      id: {
        type: "string",
      },
      date: {
        type: "string",
      },
      homeTeam: {
        type: "string",
      },
      awayTeam: {
        type: "string",
      },
      homeScore: {
        type: "number",
      },
      awayScore: {
        type: "number",
      },
      location: {
        type: "string",
      },
      division: {
        type: "string",
      },
      attendance: {
        type: "number",
      },
      weatherConditions: {
        type: "string",
      },
      scorers: {
        type: "list",
        items: {
          type: "map",
          properties: {
            playerId: {
              type: "string",
            },
            goals: {
              type: "number",
            },
            team: {
              type: "string",
            },
          },
        },
      },
      referees: {
        type: "list",
        items: {
          type: "string",
        },
      },
    },
    indexes: {
      byGame: {
        pk: {
          field: "ppk",
          composite: ["id"],
        },
        sk: {
          field: "psk",
          composite: ["type"],
        },
      },
      all: {
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: [],
          template: "game",
        },
        sk: {
          field: "gsi1sk",
          composite: ["division", "location"],
        },
      },
      recent: {
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: [],
          template: "game",
        },
        sk: {
          field: "gsi2sk",
          composite: ["date"],
        },
      },
    },
  },
  { client }
);

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Entity, Service } from "electrodb";

const client = new DynamoDBClient({});

export const Player = new Entity(
  {
    model: {
      entity: "player",
      version: "1",
      service: "players",
    },
    attributes: {
      type: {
        type: "string",
        readOnly: true,
        set: () => "player",
      },
      id: {
        type: "string",
        required: true,
      },
      age: {
        type: "number",
      },
      position: {
        type: "string",
      },
      firstName: {
        type: "string",
      },
      lastName: {
        type: "string",
      },
      jerseyNumber: {
        type: "number",
      },
      teamId: {
        type: "string",
      },
      stats: {
        type: "map",
        properties: {
          gamesPlayed: {
            type: "number",
          },
          goalsScored: {
            type: "number",
          },
          assists: {
            type: "number",
          },
          yellowCards: {
            type: "number",
          },
          redCards: {
            type: "number",
          },
        },
      },
      attendance: {
        type: "list",
        items: {
          type: "map",
          properties: {
            date: {
              type: "string",
            },
            present: {
              type: "boolean",
            },
          },
        },
      },
    },
    indexes: {
      byPlayer: {
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
          template: "player",
        },
        sk: {
          field: "gsi1sk",
          composite: ["teamId", "lastName"],
        },
      },
    },
  },
  { client }
);

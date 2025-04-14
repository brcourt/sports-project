import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Entity, Service } from "electrodb";

const client = new DynamoDBClient({});

export const Team = new Entity(
  {
    model: {
      entity: "team",
      version: "1",
      service: "teams",
    },
    attributes: {
      type: {
        type: "string",
        readOnly: true,
        set: () => "team",
      },
      id: {
        type: "string",
        required: true,
      },
      division: {
        type: "string",
      },
      name: {
        type: "string",
      },
      coach: {
        type: "string",
      },
      wins: {
        type: "number",
      },
      losses: {
        type: "number",
      },
      ties: {
        type: "number",
      },
      pointsScored: {
        type: "number",
      },
      pointsAllowed: {
        type: "number",
      },
      players: {
        type: "list",
        items: {
          type: "string",
        },
      },
    },
    indexes: {
      byTeam: {
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
          template: "team",
        },
        sk: {
          field: "gsi1sk",
          composite: ["division", "name"],
        },
      },
    },
  },
  { client }
);

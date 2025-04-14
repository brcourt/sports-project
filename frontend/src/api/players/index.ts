import { API } from "..";

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  position: string;
  jerseyNumber: number;
  teamId: string;
  stats: {
    gamesPlayed: number;
    goalsScored: number;
    assists: number;
    yellowCards: number;
    redCards: number;
  };
  attendance: {
    date: string;
    present: boolean;
  }[];
}

export const listPlayers = async (): Promise<Player[]> => {
  return API({ url: "player" });
};

export const getPlayer = async (playerId: string): Promise<Player[]> => {
  return API({ url: `player/${playerId}` });
};

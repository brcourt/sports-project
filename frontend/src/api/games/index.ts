import { API } from "..";

export interface Game {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  location: string;
  division: string;
  attendance: number;
  weatherConditions: string;
  scorers: {
    playerId: string;
    goals: number;
    team: string;
  }[];
  referees: string[];
}

export const listGames = async (): Promise<Game[]> => {
  return API({ url: "game" });
};

export const getGame = async (gameId: string): Promise<Game[]> => {
  return API({ url: `game/${gameId}` });
};

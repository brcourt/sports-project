import { API } from "..";

export interface Team {
  id: string;
  name: string;
  division: string;
  coach: string;
  wins: number;
  losses: number;
  ties: number;
  pointsScored: number;
  pointsAllowed: number;
  players: string[];
}

export const listTeams = async (): Promise<Team[]> => {
  return API({ url: "team" });
};

export const getTeam = async (teamId: string): Promise<Team[]> => {
  return API({ url: `team/${teamId}` });
};

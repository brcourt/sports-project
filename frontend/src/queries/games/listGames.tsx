import { useQuery } from "@tanstack/react-query";
import { getGame, listGames } from "../../api/games";

export function queryGames() {
  const query = useQuery({ queryKey: ["games"], queryFn: listGames });

  return query;
}

export function querySingleGame(gameId: string) {
  const query = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => getGame(gameId),
  });

  // We can use Dependant queries here to populate other query keys as we navigate.

  // const homeTeam = query.data?.[0]?.homeTeam;
  // const awayTeam = query.data?.[0]?.awayTeam;

  // const homeTeamQuery = useQuery({
  //   queryKey: ["team", homeTeam],
  //   queryFn: () => getGame(homeTeam),
  //   enabled: !!homeTeam,
  // });

  // const awayTeamQuery = useQuery({
  //   queryKey: ["team", awayTeam],
  //   queryFn: () => getGame(awayTeam),
  //   enabled: !!awayTeam,
  // });

  return query;
}

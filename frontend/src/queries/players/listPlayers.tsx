import { useQuery } from "@tanstack/react-query";
import { getPlayer, listPlayers } from "../../api/players";

export function queryPlayers() {
  const query = useQuery({
    queryKey: ["players"],
    queryFn: listPlayers,
  });

  return query;
}

export function querySinglePlayer(playerId: string) {
  const query = useQuery({
    queryKey: ["player", playerId],
    queryFn: () => getPlayer(playerId),
  });

  return query;
}

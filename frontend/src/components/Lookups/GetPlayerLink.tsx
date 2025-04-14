import { Skeleton } from "@mantine/core";
import { querySinglePlayer } from "../../queries/players/listPlayers";
import { Link } from "react-router-dom";

export function GetPlayerName({
  playerId,
  noLink = false,
}: {
  playerId: string;
  noLink?: boolean;
}) {
  const { data, isPending, isError } = querySinglePlayer(playerId);

  if (isPending) {
    return <Skeleton height={8} radius="md" />;
  }

  if (isError) {
    return "There was an error...";
  }

  if (data.length > 0) {
    const fullName = `${data[0].firstName} ${data[0].lastName}`;
    return noLink ? (
      fullName
    ) : (
      <Link to={`/players/${playerId}`}>{fullName}</Link>
    );
  }

  return "player not found";
}

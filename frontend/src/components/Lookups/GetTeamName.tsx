import { Skeleton } from "@mantine/core";
import { querySingleTeam } from "../../queries/teams/listTeams";
import { Link } from "react-router-dom";

export function GetTeamLink({
  teamId,
  noLink = false,
}: {
  teamId: string;
  noLink?: boolean;
}) {
  const { data, isPending, isError } = querySingleTeam(teamId);

  if (isPending) {
    return <Skeleton height={8} radius="md" />;
  }

  if (isError) {
    return "There was an error...";
  }

  if (data.length > 0) {
    return noLink ? (
      data[0].name
    ) : (
      <Link to={`/teams/${teamId}`}>{data[0].name}</Link>
    );
  }

  return "team not found...";
}

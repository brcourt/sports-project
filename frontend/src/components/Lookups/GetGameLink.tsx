import { Skeleton } from "@mantine/core";
import { querySingleGame } from "../../queries/games/listGames";
import { Link } from "react-router-dom";
import { querySingleTeam } from "../../queries/teams/listTeams";

export function GetGameLink({
  gameId,
  noLink = false,
}: {
  gameId: string;
  noLink?: boolean;
}) {
  const { data, isPending, isError } = querySingleGame(gameId);

  if (isPending) {
    return <Skeleton height={8} radius="md" />;
  }

  if (isError) {
    return "There was an error...";
  }

  if (data.length > 0) {
    const fullText = (
      <span>
        <GetVsText homeTeam={data[0].homeTeam} awayTeam={data[0].awayTeam} />
      </span>
    );
    return noLink ? fullText : <Link to={`/games/${gameId}`}>{fullText}</Link>;
  }

  return "game not found...";
}

export function GetVsText({
  homeTeam,
  awayTeam,
}: {
  homeTeam: string;
  awayTeam: string;
}) {
  const home = querySingleTeam(homeTeam);
  const away = querySingleTeam(awayTeam);

  if (home.isPending || away.isPending) {
    return <Skeleton height={8} radius="md" />;
  }

  if (home.isError || away.isError) {
    return "There was an error...";
  }

  if (home.data.length > 0 && away.data.length > 0) {
    return `${home.data[0].name} vs. ${away.data[0].name}`;
  }

  return "game not found...";
}

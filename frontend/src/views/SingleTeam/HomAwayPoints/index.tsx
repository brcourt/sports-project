import { BarChart } from "@mantine/charts";
import { queryGames } from "../../../queries/games/listGames";
import { Box, LoadingOverlay, Title } from "@mantine/core";
import { StatCard } from "../../../components/StatCard";
import { useParams } from "react-router-dom";

let data = [{ Team: "Points Scored", AwayPoints: 0, HomePoints: 0 }];

export function HomeAwayPoints() {
  const { teamId } = useParams();
  if (!teamId) {
    return <StatCard error={new Error("Incorrect context")} />;
  }

  // TODO: this query is inefficient
  const games = queryGames();

  if (games.isError) {
    return <StatCard error={games.error || undefined} />;
  }

  let homePoints = 0;
  let awayPoints = 0;
  if (games.data)
    if (games.data.length > 0) {
      games.data.map((game) => {
        if (game.homeTeam === teamId) {
          homePoints += game.homeScore;
        }
        if (game.awayTeam) {
          awayPoints += game.awayScore;
        }
      });
      data = [
        {
          Team: "Points Scored",
          AwayPoints: awayPoints,
          HomePoints: homePoints,
        },
      ];
    }

  return (
    <StatCard>
      <Box pos="relative">
        <LoadingOverlay visible={games.isPending} zIndex={1000} />
        <Title order={4}>Season points | home vs. away</Title>
        <BarChart
          h={250}
          data={data}
          dataKey="Team"
          withBarValueLabel
          withLegend
          tooltipAnimationDuration={200}
          series={[
            { name: "AwayPoints", color: "teal.6" },
            { name: "HomePoints", color: "blue.6" },
          ]}
          tickLine="y"
        />
      </Box>
    </StatCard>
  );
}

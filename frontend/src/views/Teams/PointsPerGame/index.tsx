import { BarChart } from "@mantine/charts";
import { queryGames } from "../../../queries/games/listGames";
import { queryTeams } from "../../../queries/teams/listTeams";
import { Box, LoadingOverlay, Title } from "@mantine/core";
import { StatCard } from "../../../components/StatCard";

let data = [
  { Team: "Team", AwayPoints: 1200, HomePoints: 900 },
  { Team: "Team", AwayPoints: 1900, HomePoints: 1200 },
  { Team: "Team", AwayPoints: 400, HomePoints: 1000 },
  { Team: "Team", AwayPoints: 1000, HomePoints: 200 },
  { Team: "Team", AwayPoints: 800, HomePoints: 1400 },
  { Team: "Team", AwayPoints: 750, HomePoints: 600 },
];
// export const data = [
//   { month: "January", Smartphones: 1200, Laptops: 900 },
//   { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
//   { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
//   { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
//   { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
//   { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
// ];

export function PointsPerGame() {
  const games = queryGames();
  const teams = queryTeams();

  // if (games.isPending || teams.isPending) {
  //   return (
  //     <StatCard>
  //       <LoadingOverlay
  //         visible={games.isPending || teams.isPending}
  //         zIndex={1000}
  //       />
  //     </StatCard>
  //   );
  // }

  if (games.isError || teams.isError) {
    return <StatCard error={games.error || teams.error || undefined} />;
  }

  if (games.data && teams.data)
    if (games.data.length > 0 && teams.data.length > 0) {
      const homePoints: Record<string, number> = {};
      const awayPoints: Record<string, number> = {};

      games.data.map((game) => {
        if (game.homeTeam) {
          if (!homePoints[game.homeTeam]) {
            homePoints[game.homeTeam] = 0;
          }
          homePoints[game.homeTeam] += game.homeScore;
        }
        if (game.awayTeam) {
          if (!awayPoints[game.awayTeam]) {
            awayPoints[game.awayTeam] = 0;
          }
          awayPoints[game.awayTeam] += game.awayScore;
        }
      }, {} as Record<string, number[]>);

      data = teams.data.map((team) => {
        return {
          Team: team.name,
          AwayPoints: awayPoints[team.id],
          HomePoints: homePoints[team.id],
        };
      });
    }

  return (
    <StatCard>
      <Box pos="relative">
        <LoadingOverlay
          visible={games.isPending || teams.isPending}
          zIndex={1000}
        />
        <Title order={4}>Season points both home and away</Title>
        <BarChart
          h={300}
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

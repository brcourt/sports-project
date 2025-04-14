import { Grid, Skeleton } from "@mantine/core";
import { RosterTable } from "./LeagueTeamsTable";
import { PointsPerGame } from "./PointsPerGame";
import { AreaGraph } from "../../components/ExampleGraphs/AreaGraph";
import { RadarGraph } from "../../components/ExampleGraphs/RadarGraph";
import { ScatterGraph } from "../../components/ExampleGraphs/ScatterGraph";
import { AreaGraphSplit } from "../../components/ExampleGraphs/AreaGraphSplit";
// import { PaginatedRosterTable } from "./Roster/pagiantedTeams";
// import { InfiniteRosterTable } from "./Roster/infinteTeams";

const child = <Skeleton height={240} radius="md" animate={false} />;

export function Teams() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 8 }}>
        <RosterTable />
        {/* <PaginatedRosterTable /> */}
        {/* <InfiniteRosterTable /> */}
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 4 }}>
        <AreaGraph />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 8 }}>
        <PointsPerGame />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 4 }}>
        <RadarGraph />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 5 }}>
        <ScatterGraph />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 7 }}>
        <AreaGraphSplit />
      </Grid.Col>
    </Grid>
  );
}

export default Teams;

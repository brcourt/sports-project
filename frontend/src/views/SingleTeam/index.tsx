import { Grid, Skeleton } from "@mantine/core";
import { TeamTable } from "./TeamTable";
import { WinLossPie } from "./WinLossPie";
import { HomeAwayPoints } from "./HomAwayPoints";
import { TeamGameTable } from "./TeamGamesTable";
import { AreaGraph } from "../../components/ExampleGraphs/AreaGraph";
import { CompositeGraph } from "../../components/ExampleGraphs/CompositeGraph";
import { ScatterGraph } from "../../components/ExampleGraphs/ScatterGraph";
import { AreaGraphSplit } from "../../components/ExampleGraphs/AreaGraphSplit";

const child = <Skeleton height={240} radius="md" animate={false} />;

export function SingleTeam() {
  return (
    <Grid grow>
      <Grid.Col span={{ base: 12, sm: 2 }}>
        <WinLossPie />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 2 }}>
        <HomeAwayPoints />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <TeamGameTable />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 3 }}>
        <AreaGraph />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 3 }}>
        <CompositeGraph />
      </Grid.Col>

      <Grid.Col span={{ base: 12, sm: 12 }}>
        <TeamTable />
      </Grid.Col>

      <Grid.Col span={{ base: 12, sm: 4 }}>
        <ScatterGraph />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 8 }}>
        <AreaGraphSplit />
      </Grid.Col>
    </Grid>
  );
}

export default SingleTeam;

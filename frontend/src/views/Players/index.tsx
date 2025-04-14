import { Grid } from "@mantine/core";
import { PlayerTable } from "./PlayerTable";
import { TopScorers } from "./TopScorers";
import { MostAssists } from "./TopAssists";
import { MostPenatlties } from "./MostPenalties";
import { AreaGraph } from "../../components/ExampleGraphs/AreaGraph";
import { RadarGraph } from "../../components/ExampleGraphs/RadarGraph";
import { AreaGraphSplit } from "../../components/ExampleGraphs/AreaGraphSplit";
import { ScatterGraph } from "../../components/ExampleGraphs/ScatterGraph";

export function Players() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 8 }}>
        <PlayerTable />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 4 }}>
        <AreaGraph />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
        <TopScorers />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
        <MostAssists />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
        <MostPenatlties />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6, md: 5, lg: 3 }}>
        <RadarGraph />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 12, md: 7, lg: 6 }}>
        <AreaGraphSplit />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 12, lg: 6 }}>
        <ScatterGraph />
      </Grid.Col>
    </Grid>
  );
}

export default Players;

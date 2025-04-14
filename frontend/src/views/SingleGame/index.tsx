import { Grid, Title } from "@mantine/core";
import { ExampleCarousel } from "../../components/ExampleCarousel";
import { GameTeamsInfo } from "./GameTeamInfo";
import { AreaGraph } from "../../components/ExampleGraphs/AreaGraph";
import { AreaGraphSplit } from "../../components/ExampleGraphs/AreaGraphSplit";
import { RadarGraph } from "../../components/ExampleGraphs/RadarGraph";
import { ScatterGraph } from "../../components/ExampleGraphs/ScatterGraph";
import { CompositeGraph } from "../../components/ExampleGraphs/CompositeGraph";

export function SingleGame() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12 }}>
        <Title order={3}>Match Photos</Title>
        <ExampleCarousel />
      </Grid.Col>
      <Grid.Col span={{ base: 12 }}>
        <GameTeamsInfo />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 12, md: 6 }}>
        <AreaGraphSplit />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 12, md: 6 }}>
        <CompositeGraph />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6, md: 12, lg: 5 }}>
        <AreaGraph />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 3, md: 6, lg: 3 }}>
        <RadarGraph />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 3, md: 6, lg: 4 }}>
        <ScatterGraph />
      </Grid.Col>
    </Grid>
  );
}

export default SingleGame;

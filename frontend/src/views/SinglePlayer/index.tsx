import { Grid, Skeleton, Title } from "@mantine/core";
import { PlayerTable } from "./PlayerTable";
import { PlayerCard } from "./PlayerCard";
import { PlayerGameAttendance } from "./GameAttendance";
import { AreaGraph } from "../../components/ExampleGraphs/AreaGraph";
import { AreaGraphSplit } from "../../components/ExampleGraphs/AreaGraphSplit";
import { RadarGraph } from "../../components/ExampleGraphs/RadarGraph";
import { ScatterGraph } from "../../components/ExampleGraphs/ScatterGraph";
import { ExampleCarousel } from "../../components/ExampleCarousel";

const child = <Skeleton height={240} radius="md" animate={false} />;

export function SinglePlayer() {
  return (
    <Grid>
      <Grid.Col
        span={{ base: 12, sm: 6, lg: 8, xl: 9 }}
        order={{ base: 2, sm: 1 }}
      >
        <Grid>
          <Grid.Col span={{ base: 12, lg: 8, xl: 8 }}>
            <AreaGraph />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 4, xl: 4 }}>
            <RadarGraph />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 4, xl: 4 }}>
            <ScatterGraph />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 8, xl: 8 }}>
            <AreaGraphSplit />
          </Grid.Col>
          <Grid.Col span={{ base: 12 }}>
            <Title order={3}>Player Photos</Title>
            <ExampleCarousel />
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col
        span={{ base: 12, sm: 6, lg: 4, xl: 3 }}
        order={{ base: 1, sm: 2 }}
      >
        <Grid>
          <Grid.Col span={12}>
            <PlayerCard />
          </Grid.Col>
          <Grid.Col span={12}>
            <PlayerGameAttendance />
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
}

export default SinglePlayer;

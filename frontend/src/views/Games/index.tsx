import { Center, Grid, Indicator, Title } from "@mantine/core";
import { GameTable } from "./GamesTable";
import { StatCard } from "../../components/StatCard";
import { Calendar } from "@mantine/dates";
import { AreaGraph } from "../../components/ExampleGraphs/AreaGraph";
import { AreaGraphSplit } from "../../components/ExampleGraphs/AreaGraphSplit";
import { RadarGraph } from "../../components/ExampleGraphs/RadarGraph";
import { ScatterGraph } from "../../components/ExampleGraphs/ScatterGraph";

export function Games() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 8 }}>
        <GameTable />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 4 }}>
        <StatCard>
          <Title order={4}>Game Schedule</Title>
          <Center>
            <Calendar
              size="lg"
              mt="xl"
              renderDay={(date) => {
                const day = date.getDate();
                return (
                  <Indicator size={6} offset={-2} disabled={day !== 16}>
                    <div>{day}</div>
                  </Indicator>
                );
              }}
            />
          </Center>
        </StatCard>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 4, xl: 4 }}>
        <RadarGraph />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 8, xl: 8 }}>
        <AreaGraph />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 8, xl: 8 }}>
        <AreaGraphSplit />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 4, xl: 4 }}>
        <ScatterGraph />
      </Grid.Col>
    </Grid>
  );
}

export default Games;

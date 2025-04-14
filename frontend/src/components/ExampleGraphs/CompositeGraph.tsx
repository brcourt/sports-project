import { CompositeChart } from "@mantine/charts";
import { StatCard } from "../StatCard";
import { Title } from "@mantine/core";

export const data = [
  {
    date: "Mar 22",
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: "Mar 23",
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: "Mar 24",
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: "Mar 25",
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: "Mar 26",
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
];

export function CompositeGraph() {
  return (
    <StatCard>
      <Title order={4}>Example Composite Chart</Title>
      <CompositeChart
        h={250}
        data={data}
        dataKey="date"
        maxBarWidth={30}
        series={[
          { name: "Tomatoes", color: "rgba(18, 120, 255, 0.2)", type: "bar" },
          { name: "Apples", color: "red.8", type: "line" },
          { name: "Oranges", color: "yellow.8", type: "area" },
        ]}
        curveType="linear"
      />
    </StatCard>
  );
}

import { RadarChart } from "@mantine/charts";
import { StatCard } from "../StatCard";
import { Title } from "@mantine/core";

export const data = [
  {
    product: "Apples",
    "Sales January": 120,
    "Sales February": 100,
  },
  {
    product: "Oranges",
    "Sales January": 98,
    "Sales February": 90,
  },
  {
    product: "Tomatoes",
    "Sales January": 86,
    "Sales February": 70,
  },
  {
    product: "Grapes",
    "Sales January": 99,
    "Sales February": 80,
  },
  {
    product: "Bananas",
    "Sales January": 85,
    "Sales February": 120,
  },
  {
    product: "Lemons",
    "Sales January": 65,
    "Sales February": 150,
  },
];

export function RadarGraph() {
  return (
    <StatCard>
      <Title order={4}>Example Radar Chart</Title>
      <RadarChart
        h={300}
        data={data}
        dataKey="product"
        withPolarRadiusAxis
        withLegend
        series={[
          { name: "Sales January", color: "blue.6", opacity: 0.2 },
          { name: "Sales February", color: "orange.6", opacity: 0.2 },
        ]}
      />
    </StatCard>
  );
}

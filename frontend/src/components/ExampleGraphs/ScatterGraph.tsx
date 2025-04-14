import { ScatterChart } from "@mantine/charts";
import { StatCard } from "../StatCard";
import { Title } from "@mantine/core";

export const data = [
  {
    color: "blue.5",
    name: "Group 1",
    data: [
      { age: 25, BMI: 20 },
      { age: 30, BMI: 22 },
      { age: 35, BMI: 18 },
      { age: 40, BMI: 25 },
      { age: 45, BMI: 30 },
      { age: 28, BMI: 15 },
      { age: 22, BMI: 12 },
      { age: 50, BMI: 28 },
      { age: 32, BMI: 19 },
      { age: 48, BMI: 31 },
      { age: 26, BMI: 24 },
      { age: 38, BMI: 27 },
      { age: 42, BMI: 29 },
      { age: 29, BMI: 16 },
      { age: 34, BMI: 23 },
      { age: 44, BMI: 33 },
      { age: 23, BMI: 14 },
      { age: 37, BMI: 26 },
      { age: 49, BMI: 34 },
      { age: 27, BMI: 17 },
      { age: 41, BMI: 32 },
      { age: 31, BMI: 21 },
      { age: 46, BMI: 35 },
      { age: 24, BMI: 13 },
      { age: 33, BMI: 22 },
      { age: 39, BMI: 28 },
      { age: 47, BMI: 30 },
      { age: 36, BMI: 25 },
      { age: 43, BMI: 29 },
      { age: 21, BMI: 11 },
    ],
  },
];

export function ScatterGraph() {
  return (
    <StatCard>
      <Title order={4}>Example Scatter Plot</Title>
      <ScatterChart
        h={250}
        data={data}
        dataKey={{ x: "age", y: "BMI" }}
        xAxisLabel="Age"
        yAxisLabel="BMI"
        referenceLines={[
          { y: 14, label: "Underweight ↓", color: "red.7" },
          { y: 19, label: "Normal weight", color: "teal.7" },
          { y: 30, label: "Overweight ↑", color: "red.7" },
        ]}
      />
    </StatCard>
  );
}

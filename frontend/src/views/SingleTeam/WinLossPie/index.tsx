import { Box, Center, LoadingOverlay, Text, Title } from "@mantine/core";
import { DonutChart } from "@mantine/charts";
import { querySingleTeam } from "../../../queries/teams/listTeams";
import { useParams } from "react-router-dom";
import { StatCard } from "../../../components/StatCard";

let name = "Loading";
let ratio = [
  { name: "Losses", value: 2, color: "red.6" },
  { name: "Ties", value: 1, color: "yellow.6" },
  { name: "Wins", value: 8, color: "teal.6" },
];

export function WinLossPie() {
  const { teamId } = useParams();
  if (!teamId) {
    return <StatCard error={new Error("Incorrect context")} />;
  }

  const { isPending, isError, data, error } = querySingleTeam(teamId);

  if (isError) {
    return <StatCard error={error} />;
  }

  if (!isPending) {
    name = data[0].name;
    ratio = [
      { name: "Losses", value: data[0].losses, color: "red.6" },
      { name: "Ties", value: data[0].ties, color: "yellow.6" },
      { name: "Wins", value: data[0].wins, color: "teal.6" },
    ];
  }

  return (
    <StatCard>
      <Box pos="relative">
        <LoadingOverlay visible={isPending} zIndex={1000} />
        <Center>
          <Title order={3}>{name}</Title>
        </Center>
        <Text fz="xs" mb="sm" ta="center">
          Wins / Losses / Ties
        </Text>
        <Center>
          <DonutChart
            withLabelsLine
            labelsType="value"
            withLabels
            size={120}
            thickness={25}
            paddingAngle={4}
            data={ratio}
          />
        </Center>
      </Box>
    </StatCard>
  );
}

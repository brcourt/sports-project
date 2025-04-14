import { Group, Progress, Skeleton, Table, Text, Title } from "@mantine/core";
import classes from "./TeamInfoTable.module.css";
import { StatCard } from "../../../components/StatCard";
import { querySingleTeam } from "../../../queries/teams/listTeams";
import { GetTeamLink } from "../../../components/Lookups/GetTeamName";
import { useParams } from "react-router-dom";

export function TeamInfoTable({ teamId }: { teamId: string }) {
  const skeleton = teamInfoSkeleton();
  const { isPending, isError, data, error, refetch } = querySingleTeam(teamId);

  if (isPending) {
    return <TeamInfoTableHead>{skeleton}</TeamInfoTableHead>;
  }

  if (isError) {
    return <StatCard error={error} refresh={refetch} />;
  }

  const rows = data?.map((row) => {
    const totalGames = row.losses + row.wins;
    const winning = (row.wins / totalGames) * 100;
    const losing = (row.losses / totalGames) * 100;
    const tied = (row.losses / totalGames) * 100;

    return (
      <>
        <Table.Tr key="division">
          <Table.Th>Division</Table.Th>
          <Table.Td>{row.division}</Table.Td>
        </Table.Tr>
        <Table.Tr key="coach">
          <Table.Th>Coach</Table.Th>
          <Table.Td>{row.coach}</Table.Td>
        </Table.Tr>
        <Table.Tr key="totalGames">
          <Table.Th>Total Games</Table.Th>
          <Table.Td>{totalGames}</Table.Td>
        </Table.Tr>
        <Table.Tr key="ratio">
          <Table.Th>Win/Loss Ratio</Table.Th>
          <Table.Td>
            <Group justify="space-between">
              <Text fz="xs" c="teal" fw={700}>
                {winning.toFixed(0)}%
              </Text>

              <Text fz="xs" c="red" fw={700}>
                {losing.toFixed(0)}%
              </Text>
            </Group>
            <Progress.Root>
              <Progress.Section
                className={classes.progressSection}
                value={winning}
                color="teal"
              />
              <Progress.Section
                className={classes.progressSection}
                value={tied}
                color="yellow"
              />

              <Progress.Section
                className={classes.progressSection}
                value={losing}
                color="red"
              />
            </Progress.Root>
          </Table.Td>
        </Table.Tr>
      </>
    );
  });

  return (
    <StatCard>
      <Title order={4}>
        <GetTeamLink teamId={teamId} />
      </Title>
      <Table variant="vertical" verticalSpacing="xs" layout="fixed">
        {rows}
      </Table>
    </StatCard>
  );
}

const TeamInfoTableHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <StatCard>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Team</Table.Th>
              <Table.Th>Division</Table.Th>
              <Table.Th>Coach</Table.Th>
              <Table.Th>Total Games</Table.Th>
              <Table.Th>Win/Loss</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{children}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </StatCard>
  );
};

const teamInfoSkeleton = () => {
  return new Array(16).fill("").map((_, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Skeleton height={8} radius="md" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={8} width={50} radius="md" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={8} radius="md" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={8} width={50} radius="md" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={8} radius="md" />
      </Table.Td>
    </Table.Tr>
  ));
};

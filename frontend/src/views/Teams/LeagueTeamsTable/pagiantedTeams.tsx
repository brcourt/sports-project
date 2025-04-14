import { Group, Progress, Skeleton, Table, Text } from "@mantine/core";
import classes from "./RosterTable.module.css";
import { StatCard } from "../../../components/StatCard";
import { queryAllTeams } from "../../../queries/teams/listTeams";

export function PaginatedRosterTable() {
  const skeleton = rosterSkeleton();
  const { isPending, isError, data, error, refetch } = queryAllTeams();

  if (isPending) {
    return (
      <StatCard>
        <RosterTableHead>{skeleton}</RosterTableHead>
      </StatCard>
    );
  }

  if (isError) {
    return <StatCard error={error} refresh={refetch} />;
  }

  const rows = data.teams.map((row, index) => {
    const totalGames = row.losses + row.wins;
    const winning = (row.wins / totalGames) * 100;
    const losing = (row.losses / totalGames) * 100;
    const tied = (row.losses / totalGames) * 100;

    return (
      <>
        <Table.Tr key={index}>
          <Table.Td>{row.name}</Table.Td>
          <Table.Td>{row.division}</Table.Td>
          <Table.Td>{row.coach}</Table.Td>
          <Table.Td>{Intl.NumberFormat().format(totalGames)}</Table.Td>
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
      <RosterTableHead>{rows}</RosterTableHead>
      {/* <Pagination total={data.token ? page + 1 : page} />

      <Anchor key="wouldyouliketoknowmore?" onClick={}>
        Next Page
      </Anchor> */}
    </StatCard>
  );
}

const RosterTableHead = ({ children }: { children: React.ReactNode }) => {
  return (
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
  );
};

const rosterSkeleton = () => {
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

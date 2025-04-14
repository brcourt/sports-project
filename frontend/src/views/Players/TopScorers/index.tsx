import { Avatar, Center, Flex, Skeleton, Table, Title } from "@mantine/core";
import { StatCard } from "../../../components/StatCard";
import { queryPlayers } from "../../../queries/players/listPlayers";
import { GetPlayerName } from "../../../components/Lookups/GetPlayerLink";
import { dynamicSort } from "../../../utils";

export function TopScorers() {
  const skeleton = TopScorersSkeleton();
  const { isPending, isError, data, error, refetch } = queryPlayers();

  if (isPending) {
    return <TopScorersTableHead>{skeleton}</TopScorersTableHead>;
  }

  if (isError) {
    return <StatCard error={error || undefined} refresh={refetch} />;
  }

  const rows = data
    .sort((a, b) =>
      a.stats.goalsScored > b.stats.goalsScored
        ? -1
        : b.stats.goalsScored > a.stats.goalsScored
        ? 1
        : 0
    )
    .slice(0, 5)
    .map((row, index) => {
      return (
        <Table.Tr key={row.id}>
          <Table.Td width="50px">{index + 1}</Table.Td>
          <Table.Td>
            <Flex gap="md" align="center">
              <Avatar radius="xl" />
              <GetPlayerName playerId={row.id} />
            </Flex>
          </Table.Td>
          <Table.Td align="right" width="50px">
            {row.stats.goalsScored}
          </Table.Td>
        </Table.Tr>
      );
    });
  // console.log(data);

  return <TopScorersTableHead>{rows}</TopScorersTableHead>;
}

const TopScorersTableHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <StatCard>
      <Title order={4}>Top Scorers</Title>
      <Table variant="vertical" verticalSpacing="xs" layout="fixed">
        {children}
      </Table>
    </StatCard>
  );
};

const TopScorersSkeleton = () => {
  return new Array(16).fill("").map((_, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Center>
          <Avatar radius="xl" />
          Loading Player
        </Center>
      </Table.Td>
      <Table.Td>
        <Skeleton />
      </Table.Td>
    </Table.Tr>
  ));
};

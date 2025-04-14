import { Avatar, Center, Flex, Skeleton, Table, Title } from "@mantine/core";
import { StatCard } from "../../../components/StatCard";
import { queryPlayers } from "../../../queries/players/listPlayers";
import { GetPlayerName } from "../../../components/Lookups/GetPlayerLink";

export function MostPenatlties() {
  const skeleton = MostPenatltiesSkeleton();
  const { isPending, isError, data, error, refetch } = queryPlayers();

  if (isPending) {
    return <MostPenatltiesTableHead>{skeleton}</MostPenatltiesTableHead>;
  }

  if (isError) {
    return <StatCard error={error || undefined} refresh={refetch} />;
  }

  const rows = data
    .sort((a, b) =>
      a.stats.yellowCards + a.stats.redCards >
      b.stats.yellowCards + b.stats.redCards
        ? -1
        : b.stats.yellowCards + b.stats.redCards >
          a.stats.yellowCards + a.stats.redCards
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
            {row.stats.yellowCards + row.stats.redCards}
          </Table.Td>
        </Table.Tr>
      );
    });
  // console.log(data);

  return <MostPenatltiesTableHead>{rows}</MostPenatltiesTableHead>;
}

const MostPenatltiesTableHead = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <StatCard>
      <Title order={4}>Most Penalties</Title>
      <Table variant="vertical" verticalSpacing="xs" layout="fixed">
        {children}
      </Table>
    </StatCard>
  );
};

const MostPenatltiesSkeleton = () => {
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

import { Avatar, Skeleton, Table, Title } from "@mantine/core";
import { StatCard } from "../../../components/StatCard";
import { queryPlayers } from "../../../queries/players/listPlayers";
import { GetPlayerName } from "../../../components/Lookups/GetPlayerLink";
import { GetTeamLink } from "../../../components/Lookups/GetTeamName";
import { IconArrowAutofitUpFilled } from "@tabler/icons-react";

export function PlayerTable() {
  const skeleton = PlayerSkeleton();
  const { isPending, isError, data, error, refetch } = queryPlayers();

  if (isPending) {
    return <PlayerTableHead>{skeleton}</PlayerTableHead>;
  }

  if (isError) {
    return <StatCard error={error || undefined} refresh={refetch} />;
  }

  const rows = data?.map((row) => {
    return (
      <Table.Tr key={row.id}>
        <Table.Td>
          <Avatar radius="xl" />
        </Table.Td>
        <Table.Td>
          <GetPlayerName playerId={row.id} />
        </Table.Td>
        <Table.Td>{row.jerseyNumber}</Table.Td>
        <Table.Td>
          <GetTeamLink teamId={row.teamId} />
        </Table.Td>
        <Table.Td>{row.position}</Table.Td>
        <Table.Td>{row.stats.gamesPlayed}</Table.Td>
        <Table.Td>{row.stats.goalsScored}</Table.Td>
        <Table.Td>{row.stats.assists}</Table.Td>
        <Table.Td>{row.stats.yellowCards}</Table.Td>
        <Table.Td>{row.stats.redCards}</Table.Td>
      </Table.Tr>
    );
  });

  return <PlayerTableHead>{rows}</PlayerTableHead>;
}

const PlayerTableHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <StatCard>
      <Title order={3}>League Players</Title>
      <Table.ScrollContainer minWidth={300}>
        <Table verticalSpacing="xs" mah="800px">
          <Table.Thead>
            <Table.Tr>
              <Table.Th />
              <Table.Th>Name</Table.Th>
              <Table.Th>#</Table.Th>
              <Table.Th>Team</Table.Th>
              <Table.Th>Position</Table.Th>
              <Table.Th>Games Played</Table.Th>
              <Table.Th>Goals</Table.Th>
              <Table.Th>Assists</Table.Th>
              <Table.Th>
                <IconArrowAutofitUpFilled
                  color={"var(--mantine-color-yellow-5)"}
                />
              </Table.Th>
              <Table.Th>
                <IconArrowAutofitUpFilled
                  color={"var(--mantine-color-red-8)"}
                />
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{children}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </StatCard>
  );
};

const PlayerSkeleton = () => {
  return new Array(5).fill("").map((_, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Skeleton circle mb="xl" height={8} radius="md" />
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
      <Table.Td>
        <Skeleton height={8} width={50} radius="md" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={8} radius="md" />
      </Table.Td>
    </Table.Tr>
  ));
};

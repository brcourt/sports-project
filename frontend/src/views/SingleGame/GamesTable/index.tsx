import { Skeleton, Table } from "@mantine/core";
import { StatCard } from "../../../components/StatCard";
import { querySingleGame } from "../../../queries/games/listGames";
import { GetGameLink } from "../../../components/Lookups/GetGameLink";
import { useParams } from "react-router-dom";

export function GameTable() {
  const { gameId } = useParams();
  const skeleton = GameSkeleton();
  const { isPending, isError, data, error, refetch } = querySingleGame(gameId);

  if (isPending) {
    return <GameTableHead>{skeleton}</GameTableHead>;
  }

  if (isError) {
    return <StatCard error={error || undefined} refresh={refetch} />;
  }

  const rows = data?.map((row) => {
    return (
      <Table.Tr key={row.id}>
        <Table.Td>
          <GetGameLink gameId={row.id} />
        </Table.Td>
        <Table.Td>{row.homeTeam}</Table.Td>
        <Table.Td>{row.awayTeam}</Table.Td>
        <Table.Td>{row.homeScore}</Table.Td>
        <Table.Td>{row.awayScore}</Table.Td>
      </Table.Tr>
    );
  });

  return <GameTableHead>{rows}</GameTableHead>;
}

const GameTableHead = ({ children }: { children: React.ReactNode }) => {
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

const GameSkeleton = () => {
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

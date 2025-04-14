import { Avatar, Skeleton, Table } from "@mantine/core";
import { querySinglePlayer } from "../../../../queries/players/listPlayers";

export function SinglePlayerTableRow({ playerId }: { playerId: string }) {
  const { isPending, isError, data, error } = querySinglePlayer(playerId);

  if (isPending) {
    return <PlayerSkeleton playerId={playerId} />;
  }

  if (isError) {
    return (
      <Table.Tr key="error">
        <Table.Td>Error querying player</Table.Td>
        <Table.Td style={{ overflow: "visible" }}>{error.message}</Table.Td>
      </Table.Tr>
    );
  }

  if (data.length === 0) {
    return (
      <Table.Tr key="not-found">
        <Table.Td>
          <Avatar radius="xl" />
        </Table.Td>
        <Table.Td>Player not found</Table.Td>
      </Table.Tr>
    );
  }

  return (
    <Table.Tr key={playerId}>
      <Table.Td>
        <Avatar radius="sm" />
      </Table.Td>
      <Table.Td>{data[0].jerseyNumber}</Table.Td>
      <Table.Td>{data[0].lastName}</Table.Td>
      <Table.Td>{data[0].firstName}</Table.Td>
      <Table.Td>{data[0].position}</Table.Td>
      <Table.Td>{data[0].age}</Table.Td>
    </Table.Tr>
  );
}

const PlayerSkeleton = ({ playerId }: { playerId: string }) => {
  return (
    <Table.Tr key={playerId}>
      <Table.Td>
        <Skeleton height={8} radius="xl" />
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
  );
};

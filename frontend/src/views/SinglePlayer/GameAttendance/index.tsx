import { Center, Loader, Skeleton, Table, Title } from "@mantine/core";
import { StatCard } from "../../../components/StatCard";
import { querySinglePlayer } from "../../../queries/players/listPlayers";
import { useParams } from "react-router-dom";

export function PlayerGameAttendance() {
  const { playerId } = useParams();

  const skeleton = PlayerSkeleton();
  const { isPending, isError, data, error, refetch } =
    querySinglePlayer(playerId);

  if (isPending) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (isError) {
    return <StatCard error={error || undefined} refresh={refetch} />;
  }

  const attendance = data[0].attendance.map((attendance, id) => {
    return (
      <Table.Tr key={id}>
        <Table.Th>{attendance.date}</Table.Th>
        <Table.Td>{attendance.present ? "Played" : "Missed"}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <StatCard>
      <Title order={4}>Attendance</Title>
      <Table variant="vertical" verticalSpacing="xs" layout="fixed">
        {attendance}
      </Table>
    </StatCard>
  );
}

const PlayerSkeleton = () => {
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

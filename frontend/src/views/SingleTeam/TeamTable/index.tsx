import {
  Group,
  Progress,
  ScrollArea,
  Skeleton,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { StatCard } from "../../../components/StatCard";
import { querySingleTeam } from "../../../queries/teams/listTeams";
import { useParams } from "react-router-dom";
import classes from "./RosterTable.module.css";
import { SinglePlayerTableRow } from "./SinglePlayerTableRow";

export function TeamTable() {
  const { teamId } = useParams();
  const skeleton = TeamSkeleton();
  const { isPending, isError, data, error, refetch } = querySingleTeam(teamId);

  if (isPending) {
    return <TeamTableHead>{skeleton}</TeamTableHead>;
  }

  if (isError) {
    return <StatCard error={error || undefined} refresh={refetch} />;
  }

  const rows = data[0].players.map((playerId) => {
    return <SinglePlayerTableRow key={playerId} playerId={playerId} />;
  });

  return <TeamTableHead>{rows}</TeamTableHead>;
}

const TeamTableHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <StatCard>
      <ScrollArea.Autosize mah={500} mx="auto">
        <Title order={3}>Roster</Title>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="xs">
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th>#</Table.Th>
                <Table.Th>Last Name</Table.Th>
                <Table.Th>First Name</Table.Th>
                <Table.Th>Position</Table.Th>
                <Table.Th>Age</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{children}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </ScrollArea.Autosize>
    </StatCard>
  );
};

const TeamSkeleton = () => {
  return new Array(16).fill("").map((_, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Skeleton circle mb="lg" height={8} radius="md" />
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

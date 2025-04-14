import { Skeleton, Table, Title, Text } from "@mantine/core";
import { StatCard } from "../../../components/StatCard";
import { queryGames } from "../../../queries/games/listGames";
import { GetGameLink } from "../../../components/Lookups/GetGameLink";
import { Link, useParams } from "react-router-dom";
import { GetTeamLink } from "../../../components/Lookups/GetTeamName";

export function TeamGameTable() {
  const { teamId } = useParams();
  if (!teamId) {
    return <StatCard error={new Error("Incorrect context")} />;
  }

  const skeleton = GameSkeleton();
  const { isPending, isError, data, error, refetch } = queryGames();

  if (isPending) {
    return <GameTableHead>{skeleton}</GameTableHead>;
  }

  if (isError) {
    return <StatCard error={error || undefined} refresh={refetch} />;
  }

  const games = data.filter(
    (game) => game.homeTeam === teamId || game.awayTeam === teamId
  );

  const rows = games?.map((row) => {
    const isHometeam = row.homeTeam === teamId ? "Home" : "Away";
    const opponent = isHometeam ? row.awayTeam : row.homeTeam;
    const score = isHometeam ? row.homeScore : row.awayScore;
    const opponentScore = isHometeam ? row.awayScore : row.homeScore;
    const result =
      score === opponentScore ? "Tie" : score > opponentScore ? "Won" : "Lost";
    return (
      <Table.Tr key={row.id}>
        <Table.Td>{result}</Table.Td>
        <Table.Td>
          <GetTeamLink teamId={opponent} />
        </Table.Td>
        <Table.Td>
          {score} - {opponentScore}
        </Table.Td>
        <Table.Td>{row.location}</Table.Td>
        <Table.Td>{row.date}</Table.Td>
        <Table.Td>{row.weatherConditions}</Table.Td>
        <Table.Td>{row.attendance}</Table.Td>
      </Table.Tr>
    );
  });

  return <GameTableHead>{rows}</GameTableHead>;
}

const GameTableHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <StatCard>
      <Title order={4}>Games</Title>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th />
              <Table.Th>Against</Table.Th>
              <Table.Th>Score</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Weather</Table.Th>
              <Table.Th>Attendance</Table.Th>
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

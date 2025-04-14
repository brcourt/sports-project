import { Group, Skeleton, Table, Title } from "@mantine/core";
import { StatCard } from "../../../components/StatCard";
import { queryGames } from "../../../queries/games/listGames";
import { GetGameLink } from "../../../components/Lookups/GetGameLink";
import { GetTeamLink } from "../../../components/Lookups/GetTeamName";
import { GetWeatherIcon } from "../../../components/WeatherIcon";

export function GameTable() {
  const skeleton = GameSkeleton();
  const { isPending, isError, data, error, refetch } = queryGames();

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
        <Table.Td>
          {row.homeScore} - {row.awayScore}{" "}
        </Table.Td>
        <Table.Td>{row.division}</Table.Td>
        <Table.Td>
          {row.location} (<GetTeamLink teamId={row.homeTeam} />)
        </Table.Td>
        <Table.Td>
          <Group>
            {row.weatherConditions}
            <GetWeatherIcon weather={row.weatherConditions} />
          </Group>
        </Table.Td>
        <Table.Td>{row.date}</Table.Td>
        <Table.Td>{row.attendance}</Table.Td>
      </Table.Tr>
    );
  });

  return <GameTableHead>{rows}</GameTableHead>;
}

const GameTableHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <StatCard>
      <Title order={4}>Match History</Title>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Match</Table.Th>
              <Table.Th>Score</Table.Th>
              <Table.Th>Division</Table.Th>
              <Table.Th>Homefield</Table.Th>
              <Table.Th>Weather</Table.Th>
              <Table.Th>Date</Table.Th>
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

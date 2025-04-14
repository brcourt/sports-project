import {
  Box,
  Center,
  Flex,
  Grid,
  Group,
  Loader,
  SimpleGrid,
  Skeleton,
  Title,
} from "@mantine/core";
import { StatCard } from "../../../components/StatCard";
import { useParams } from "react-router-dom";
import { querySingleGame } from "../../../queries/games/listGames";
import { TeamInfoTable } from "../../SingleTeam/TeamInfoTable";

const child = <Skeleton height={240} radius="md" animate={false} />;

export function GameTeamsInfo() {
  const { gameId } = useParams();
  const { isPending, isError, data, error, refetch } = querySingleGame(gameId);

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

  const homeTeam = data[0].homeTeam;
  const awayTeam = data[0].awayTeam;

  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 5 }}>
        <Box miw={300}>
          <TeamInfoTable teamId={homeTeam} />
        </Box>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 2 }}>
        <Center pt={{ base: "inherit", sm: "50%" }}>
          <Title>VS.</Title>
        </Center>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 5 }}>
        <Box miw={300}>
          <TeamInfoTable teamId={awayTeam} />
        </Box>
      </Grid.Col>
    </Grid>
  );
}

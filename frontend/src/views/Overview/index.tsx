import { Button, Container, Group, Text } from "@mantine/core";
import classes from "./HeroTitle.module.css";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import { queryTeams } from "../../queries/teams/listTeams";
import { queryGames } from "../../queries/games/listGames";
import { queryPlayers } from "../../queries/players/listPlayers";
import { useNavigate } from "react-router-dom";
import { FeaturesGrid } from "./Features";

function Overview() {
  const navigate = useNavigate();
  // Prefetch data for teams, players, and games
  queryTeams();
  queryPlayers();
  queryGames();

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A{" "}
          <Text td="line-through" inherit>
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
              inherit
            >
              truly modern
            </Text>
          </Text>{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            truly half-baked
          </Text>{" "}
          way to analyze the game
        </h1>

        <Text className={classes.description} color="dimmed">
          Sample a semi-functional analytics suite built in a single day, by a
          single guy, with almost as much data is there are placeholders. Click
          one of the buttons below to check it out.
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            onClick={() => navigate("/teams")}
          >
            Get started
          </Button>

          <Button
            component="a"
            href="https://github.com/brcourt/sports-project"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<IconBrandGithubFilled size={20} />}
          >
            GitHub
          </Button>
        </Group>
      </Container>
      <FeaturesGrid />
    </div>
  );
}
export default Overview;

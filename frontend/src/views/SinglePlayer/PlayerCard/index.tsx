import { Avatar, Button, Card, Group, Skeleton, Text } from "@mantine/core";
import classes from "./PlayerCard.module.css";
import { useParams } from "react-router-dom";
import { querySinglePlayer } from "../../../queries/players/listPlayers";

export function PlayerCard() {
  const { playerId } = useParams();
  const { data } = querySinglePlayer(playerId);

  if (data) {
    stats = Object.entries(data[0].stats).map(([key, value]) => {
      return { label: key, value: value.toString() };
    });
    console.log(stats);
  }

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section
        h={80}
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
        }}
      />
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
        size={160}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />

      {data ? (
        <Text ta="center" fz="lg" fw={500} mt="sm">
          {data[0].firstName} {data[0].lastName}
        </Text>
      ) : (
        <Skeleton height={14} radius="md" my="xs" />
      )}

      {data ? (
        <Text ta="center" fz="sm" c="dimmed">
          {data[0].position}
        </Text>
      ) : (
        <Skeleton height={8} radius="md" my="xs" />
      )}

      <Group mt="md" justify="center" gap={30}>
        {items}
      </Group>
      <Button fullWidth radius="md" mt="xl" size="md" variant="default">
        Follow
      </Button>
    </Card>
  );
}

// Stats skeleton
let stats = [
  {
    label: "gamesPlayed",
    value: <Skeleton height={8} width={35} radius="md" />,
  },
  {
    label: "goalsScored",
    value: <Skeleton height={8} width={35} radius="md" />,
  },
  { label: "assists", value: <Skeleton height={8} width={35} radius="md" /> },
  {
    label: "yellowCards",
    value: <Skeleton height={8} width={35} radius="md" />,
  },
  { label: "redCards", value: <Skeleton height={14} width={35} radius="md" /> },
];

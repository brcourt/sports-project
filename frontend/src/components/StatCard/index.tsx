import { Button, Container, Group, Paper, Title, Text } from "@mantine/core";
import classes from "./StatCard.module.css";

export function StatCard({
  children,
  error,
  refresh,
}: {
  children?: React.ReactNode;
  error?: Error;
  refresh?: any;
}) {
  if (error) {
    return (
      <Paper shadow="xs" p="xl" h="100%" className={classes.error} withBorder>
        <Container className={classes.root}>
          <Title className={classes.title}>{error.name}</Title>
          <Text size="lg" ta="center" className={classes.description}>
            {error.message}
          </Text>
          <Group justify="center">
            <Button variant="white" size="md" onClick={refresh}>
              Try to refresh this card...
            </Button>
          </Group>
        </Container>
      </Paper>
    );
  }

  return (
    <Paper shadow="xs" p="xl" className={classes.root}>
      {children}
    </Paper>
  );
}

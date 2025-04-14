import {
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandYoutube,
  IconSoccerField,
} from "@tabler/icons-react";
import { ActionIcon, Box, Center, Container, Group, Text } from "@mantine/core";
import classes from "./Footer.module.css";

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Center>
          <IconSoccerField size={32} stroke={1} />
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: "darkblue", to: "darkcyan", deg: 90 }}
          >
            Demolytics
          </Text>
        </Center>
        <Group
          gap={0}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandGithub size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

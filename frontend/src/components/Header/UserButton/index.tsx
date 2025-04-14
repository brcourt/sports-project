import { IconChevronLeft, IconDoorExit } from "@tabler/icons-react";
import { Avatar, Box, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";
import classes from "./UserButton.module.css";
import { useAuthenticator } from "@aws-amplify/ui-react";

export function UserButton() {
  const { user } = useAuthenticator();
  return (
    <Menu offset={0} position="bottom-end">
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Box visibleFrom="sm">
              <IconChevronLeft size={14} stroke={1.5} className="chevren" />
            </Box>
            <Avatar radius="xl" />

            <Box visibleFrom="sm">
              <Text size="sm" fw={500}>
                Demo User
              </Text>

              <Text c="dimmed" size="xs">
                {user.signInDetails?.loginId}
              </Text>
            </Box>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <UserMenuItems />
      </Menu.Dropdown>
    </Menu>
  );
}

function UserMenuItems() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  return (
    <Menu.Dropdown>
      <Menu.Label>Application</Menu.Label>
      <Menu.Item leftSection={<IconSettings size={14} />} disabled>
        Settings
      </Menu.Item>
      <Menu.Item leftSection={<IconMessageCircle size={14} />} disabled>
        Messages
      </Menu.Item>
      <Menu.Item leftSection={<IconPhoto size={14} />} disabled>
        Gallery
      </Menu.Item>
      <Menu.Item
        leftSection={<IconSearch size={14} />}
        disabled
        rightSection={
          <Text size="xs" c="dimmed">
            ⌘K
          </Text>
        }
      >
        Search
      </Menu.Item>

      <Menu.Divider />

      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item leftSection={<IconArrowsLeftRight size={14} />} disabled>
        Transfer my data
      </Menu.Item>
      <Menu.Item
        color="red"
        leftSection={<IconDoorExit size={14} />}
        onClick={signOut}
      >
        Logout
      </Menu.Item>
    </Menu.Dropdown>
  );
}

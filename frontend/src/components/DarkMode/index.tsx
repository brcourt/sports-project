import { useMantineColorScheme, ActionIcon } from "@mantine/core";
import { IconBrightnessDownFilled, IconMoonStars } from "@tabler/icons-react";

export function ToggleDarkMode() {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      variant="transparent"
      aria-label="Change color scheme"
      onClick={() => toggleColorScheme()}
      color={colorScheme === "light" ? "grape" : "yellow"}
    >
      {colorScheme === "light" ? (
        <IconMoonStars
          style={{ width: "70%", height: "70%" }}
          stroke={1.5}
          // color="purple"
        />
      ) : (
        <IconBrightnessDownFilled
          style={{ width: "70%", height: "70%" }}
          stroke={1.5}
          color="yellow"
        />
      )}
    </ActionIcon>
  );
}

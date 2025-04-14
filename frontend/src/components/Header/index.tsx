import { Group, Menu, Box, Anchor } from "@mantine/core";
import { type ReactNode, useState } from "react";
import classes from "./Header.module.css";
import {
  type NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { UserButton } from "./UserButton";
import {
  IconChartHistogram,
  IconChevronDown,
  IconSoccerField,
} from "@tabler/icons-react";
import { ToggleDarkMode } from "../DarkMode";

const links: { link: string; label: string | ReactNode }[] = [
  { link: "/", label: <IconSoccerField size={48} stroke={1} /> },
  { link: "/teams", label: "Teams" },
  { link: "/players", label: "Players" },
  // { link: "/coaches", label: "Coaches" },
  { link: "/games", label: "Games" },
];

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const items = links.map((link, index) => (
    <Anchor
      component="button"
      key={`${index}${link.link}`}
      // href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      visibleFrom="sm"
      underline="never"
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        navigate(link.link);
      }}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Group h="100%" pl="md" justify="space-between">
      {/* Left Side Items */}
      <Group h="100%" gap={0}>
        <MobileMenu active={active} setActive={setActive} navigate={navigate} />
        {items}
      </Group>

      {/* Right Side Items */}
      <Group h="100%" justify="flex-end">
        <ToggleDarkMode />
        <UserButton />
      </Group>
    </Group>
  );
}

// Mobile Menu for smaller screens, only shown when screen breakpoint "sm" or smaller is active
function MobileMenu({
  active,
  setActive,
  navigate,
}: {
  active?: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  navigate: NavigateFunction;
}) {
  const activeLink = links.filter((link) => link.link === active);

  return (
    <Box hiddenFrom="sm" p={0}>
      <Menu width={200} shadow="md">
        <Menu.Target>
          <Anchor
            variant="transparent"
            className={classes.link}
            underline="never"
            m={0}
          >
            <Group>
              {activeLink[0]?.label ?? "Menu"}
              <IconChevronDown size={14} stroke={1.5} className="chevren" />
            </Group>
          </Anchor>
        </Menu.Target>
        <Menu.Dropdown>
          {links.map((link, index) => (
            <Menu.Item
              component="a"
              key={`${index}-mobile-${link.link}`}
              href={link.link}
              data-active={active === link.link || undefined}
              onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
                navigate(link.link);
              }}
            >
              {link.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}

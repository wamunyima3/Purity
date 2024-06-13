import {
  Autocomplete,
  Group,
  rem,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Text,
  Image,
  Anchor,
  Burger,
  Menu,
} from "@mantine/core";
import {
  IconSun,
  IconMoon,
  IconSearch,
  IconDotsVertical,
} from "@tabler/icons-react";
import purityImage from "../images/purity.jpg";
import {
  IconSettings,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";

interface Link {
  link: string;
  label: string;
}

interface Props {
  side_nav_panel_opened: boolean;
  side_nav_panel_toggle: () => void;
  links: Link[];
}

const Header = ({
  side_nav_panel_opened,
  side_nav_panel_toggle,
  links,
}: Props) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });

  const items = links.map((link) => (
    <Anchor
      key={link.label}
      href={link.link}
      underline="hover"
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Group justify="space-between" className="px-2">
      <Group>
        <Burger
          opened={side_nav_panel_opened}
          onClick={side_nav_panel_toggle}
          size="sm"
        />
        <Group className="cursor-pointer" visibleFrom="sm">
          <Image radius="md" h={30} w="auto" fit="contain" src={purityImage} />
          <Text size="lg">Purity</Text>
        </Group>
      </Group>

      <Group>
        <Autocomplete
          className="block xs:block"
          visibleFrom="sm"
          placeholder="Search"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          data={[
            "React",
            "Angular",
            "Vue",
            "Next.js",
            "Riot.js",
            "Svelte",
            "Blitz.js",
          ]}
        />

        <Group justify="center" visibleFrom="xs">
          {items}
        </Group>

        <ActionIcon
          onClick={() =>
            setColorScheme(computedColorScheme === "light" ? "dark" : "light")
          }
          variant="default"
          size="lg"
          aria-label="Toggle color scheme"
        >
          <IconSun
            className={`w-[22px] h-[22px] ${
              computedColorScheme === "light" ? "hidden" : "block"
            }`}
            stroke={1.5}
          />
          <IconMoon
            className={`w-[22px] h-[22px] ${
              computedColorScheme === "dark" ? "hidden" : "block"
            }`}
            stroke={1.5}
          />
        </ActionIcon>

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon
              onClick={() => {}}
              variant="default"
              size="lg"
              aria-label="Menu"
              hiddenFrom="xs"
            >
              <IconDotsVertical stroke={1.5} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item
              leftSection={
                <IconSettings style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Settings
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconMessageCircle
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
            >
              Messages
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconPhoto style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Gallery
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconSearch style={{ width: rem(14), height: rem(14) }} />
              }
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
            <Menu.Item
              leftSection={
                <IconArrowsLeftRight
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
            >
              Transfer my data
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Delete my account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};

export default Header;

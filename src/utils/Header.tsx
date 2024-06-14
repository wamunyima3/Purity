import {
  Input,
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
import { IconMessageCircle } from "@tabler/icons-react";
import {
  Spotlight,
  SpotlightActionData,
  SpotlightActionGroupData,
  spotlight,
} from "@mantine/spotlight";

const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
  {
    group: "Pages",
    actions: [
      {
        id: "home",
        label: "Home page",
        description: "Where we present the product",
        onClick: () => console.log("Home"),
      },
      {
        id: "careers",
        label: "Careers page",
        description: "Where we list open positions",
        onClick: () => console.log("Careers"),
      },
      {
        id: "about-us",
        label: "About us page",
        description: "Where we tell what we do",
        onClick: () => console.log("About us"),
      },
    ],
  },
  {
    group: "Apps",
    actions: [
      {
        id: "svg-compressor",
        label: "SVG compressor",
        description: "Compress SVG images",
      },
      {
        id: "base64",
        label: "Base 64 converter",
        description: "Convert data to base 64 format",
      },
      {
        id: "fake-data",
        label: "Fake data generator",
        description: "Lorem ipsum generator",
      },
    ],
  },
];

interface Link {
  link: string;
  label: string;
  icon?: React.ReactNode;
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

  const menuItems = links.map((link) => (
    <Menu.Item key={link.label} leftSection={link.icon}>
      {link.label}
    </Menu.Item>
  ));

  return (
    <Group justify="space-between" className="px-2">
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        limit={7}
        searchProps={{
          leftSection: (
            <IconSearch
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          ),
          placeholder: "Search...",
        }}
      />
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
        <Input
          className="select-none block xs:block"
          component="button"
          visibleFrom="sm"
          w={200}
          pointer
          onClick={spotlight.open}
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Input>

        <Group justify="center" visibleFrom="xs">
          {items}
        </Group>

        <ActionIcon
          onClick={() => {}}
          variant="default"
          size="lg"
          aria-label="Chat"
        >
          <IconMessageCircle stroke={1.5} />
        </ActionIcon>

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
            <Menu.Label>Purity</Menu.Label>
            {menuItems}

            <Menu.Item
              leftSection={
                <IconSearch style={{ width: rem(14), height: rem(14) }} />
              }
              rightSection={
                <Text size="xs" c="dimmed">
                  ⌘K
                </Text>
              }
              onClick={spotlight.open}
            >
              Search
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};

export default Header;

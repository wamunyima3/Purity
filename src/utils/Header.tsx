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
} from "@mantine/core";
import { IconSun, IconMoon, IconSearch, IconDotsVertical } from "@tabler/icons-react";
import purityImage from "../images/purity.jpg";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

interface Props {
  opened: boolean;
  toggle: () => void;
}

const Header = ({ opened, toggle }: Props) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });

  const items = links.map((link) => (
    <Anchor
      key={link.label}
      href={link.link}
      underline="hover"
      className=""
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Group justify="space-between" className="px-2">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <Group className="cursor-pointer" visibleFrom="sm">
        <Image radius="md" h={30} w="auto" fit="contain" src={purityImage} />
        <Text size="lg">Project Mentor</Text>
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
          onClick={() => {}}
          variant="default"
          size="lg"
          aria-label="Search"
          hiddenFrom="sm"
        >
          <IconSearch stroke={1.5} />
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

        <ActionIcon
          onClick={() => {}}
          variant="default"
          size="lg"
          aria-label="Menu"
          hiddenFrom="xs"
        >
          <IconDotsVertical stroke={1.5} />
        </ActionIcon>
      </Group>
    </Group>
  );
};

export default Header;

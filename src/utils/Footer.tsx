import React from "react";
import { Text, Container, ActionIcon, Group, rem, Image, Flex } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import purityImage from "../images/purity.jpg";

const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Support", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Developer", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
];

const Footer = () => {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className="block hover:underline"
        pt={rem(3)}
        pb={rem(3)}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className="w-40" key={group.title}>
        <Text className="text-xl uppercase mb-2 font-black">{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className="pt-5 pb-5 select-none">
      <Group justify="center" gap="xl">
        <Flex direction="column">
          <Group className="cursor-pointer mb-4">
            <Image radius="md" h={30} w="auto" fit="contain" src={purityImage} />
            <Text size="lg" className="ml-2">Purity</Text>
          </Group>
          <Text size="xs" className=" text-center md:text-left">
            Build your final year project easily
          </Text>
        </Flex>
        <Group>
          {groups}
        </Group>
      </Group>
      <Container className="mt-5 pt-5 flex flex-col md:flex-row justify-between items-center border-t">
        <Text className=" text-sm mb-4 md:mb-0">
          © 2024 Purity - Project Mentor. All rights reserved.
        </Text>
        <Group gap={0} className="flex space-x-4">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;

import { Autocomplete, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className="block leading-tight p-2 rounded-sm text-gray-700 dark:text-dark-0 text-sm font-medium hover:bg-gray-100 dark:hover:bg-dark-6"
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <header className="h-[56px] mb-[120px] bg-body border-b-[1px] border-gray-300 dark:border-dark-4 px-md">
      <div className="h-[56px] flex justify-between items-center">
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <IconSearch size={28} />
        </Group>

        <Group>
          <Group ml={50} gap={5} className="hidden sm:flex">
            {items}
          </Group>
          <Autocomplete
            className="block xs:block"
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
          />
        </Group>
      </div>
    </header>
  );
};

export default Header;

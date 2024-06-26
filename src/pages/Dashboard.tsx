import React from "react";
import { AppShell, Box, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "../utils/Header";
import Footer from "../utils/Footer";
import {
  IconArrowsLeftRight,
  IconFolder,
  IconSettings,
  IconSearch,
} from "@tabler/icons-react";
import { rem } from "@mantine/core";

const links = [
  { link: "/projects", label: "Projects", icon: <IconFolder style={{ width: rem(14), height: rem(14) }} /> },
  { link: "/settings", label: "Settings", icon: <IconSettings style={{ width: rem(14), height: rem(14) }} /> },
  { link: "/pointers", label: "Pointers", icon: <IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} /> },
];

const Dashboard = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      padding="md"
      styles={(theme) => ({
        main: {
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        },
      })}
      footer={{
        height: 300,
        offset: false,
      }}
    >
      <AppShell.Header className="content-center">
        <Header
          side_nav_panel_opened={opened}
          side_nav_panel_toggle={toggle}
          links={links}
        />
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main className="flex-grow">
        <Paper className="p-4 mb-10"></Paper>
        <Box className="mt-auto w-full border-t">
          <Footer />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default Dashboard;

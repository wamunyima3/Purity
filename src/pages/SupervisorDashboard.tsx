import { AppShell, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "../utils/Header";
import Footer from "../utils/Footer";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

const SupervisorDashboard = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className="content-center">
        <Header
          side_nav_panel_opened={opened}
          side_nav_panel_toggle={toggle}
          links={links}
        />
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main className="relative">
        <Box className="pb-16">
          Main Content
        </Box>
        <Box pl={300} className="absolute bottom-0 left-0 w-full">
          <Footer />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default SupervisorDashboard;

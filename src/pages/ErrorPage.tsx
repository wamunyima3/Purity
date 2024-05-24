import {
  Container,
  Title,
  Text,
  Button,
  Group,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { Illustration } from "../utils/Illustration";
import { useNavigate } from "react-router-dom";
import { IconSun, IconMoon } from "@tabler/icons-react";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });

  return (
    <Container className="h-screen flex flex-col justify-center select-none items-center">
      <Illustration className="absolute inset-0 w-full h-full object-cover opacity-20 text-gray-700 dark:text-gray-700 p-20" />
      <div className="relative z-10">
        <Title className="font-[Greycliff CF] text-center font-black text-[9.5rem] sm:text-[8rem]">
          Nothing to see here
        </Title>
        <Text
          className="max-w-[135rem] mx-auto mt-10 mb-[15rem] text-center"
          color="dimmed"
          size="lg"
        >
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error, contact support.
        </Text>
        <Group justify="center">
          <Button size="md" onClick={() => navigate("/")}>
            Take me back to home page
          </Button>
        </Group>
      </div>

      <div className="absolute bottom-0 right-0 m-4">
        <ActionIcon
          onClick={() =>
            setColorScheme(computedColorScheme === "light" ? "dark" : "light")
          }
          variant="default"
          size="xl"
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
      </div>
    </Container>
  );
};

export default ErrorPage;

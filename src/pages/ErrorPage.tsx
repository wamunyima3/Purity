import { Container, Title, Text, Button, Group } from "@mantine/core";
import { Illustration } from "../utils/Illustration";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="relative h-screen flex flex-col justify-center items-center text-center">
      <Illustration className="absolute inset-0 w-full h-full object-cover opacity-75 text-gray-700 dark:text-gray-300" />
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
    </Container>
  );
};

export default ErrorPage;

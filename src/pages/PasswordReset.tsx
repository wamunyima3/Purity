import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { FiMail } from "react-icons/fi";
import { IconArrowLeft } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : "Invalid email",
    },
  });

  return (
    <div className="h-screen flex items-center justify-center select-none">
      <Container size={460} my={30}>
        <Title ta="center">Forgot your password?</Title>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>

        <Box maw={340} mx="auto">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              key={form.key("email")}
              leftSection={<FiMail />}
              {...form.getInputProps("email")}
              required
            />

            <Group
              justify="space-between"
              mt="lg"
              className="flex flex-col-reverse sm:flex-row"
            >
              <Anchor
                c="dimmed"
                size="sm"
                className="w-full text-center sm:w-auto sm:text-left"
              >
                <Center inline>
                  <IconArrowLeft
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                  <Box ml={5} onClick={() => navigate("/")}>
                    Back to the login page
                  </Box>
                </Center>
              </Anchor>
              <Button
                className="w-full text-center sm:w-auto sm:text-left"
                type="submit"
              >
                Reset password
              </Button>
            </Group>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default PasswordReset;

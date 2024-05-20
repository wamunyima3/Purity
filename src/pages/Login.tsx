import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { FiMail, FiLock } from "react-icons/fi";
import { supabase } from "../utils/supabaseClient";
import { IconX, IconCheck } from "@tabler/icons-react";
import { notifications } from '@mantine/notifications';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  LoadingOverlay,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const navigate = useNavigate();
  const { setColorScheme } = useMantineColorScheme();
  const [visible, setVisible] = useState(false); //loading overlay

  //notification icons
  const xIcon = <IconX style={{ width: rem(20), height: rem(20)}} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : "Invalid email",
      password: (value) =>
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-]).{8,}$/.test(
          value
        )
          ? null
          : "Invalid password",
    },
  });

  const signInWithEmail = async (values: FormValues) => {
    setVisible(true);
    try {
      const { email, password } = values;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log(data.user);
      navigate("/dashboard");
    } catch (error: any) {
      notifications.show({
        title: "Error!",
        message: error.message,
        icon: xIcon,
        color: 'red',
      })
    } finally {
      setVisible(false);
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "blue", type: "bars" }}
      />
      <div className="relative h-screen flex items-center justify-center select-none">
        <Container size={420} my={40}>
          <Title ta="center">Login</Title>

          <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit((values) => signInWithEmail(values))}>
              <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                leftSection={<FiMail />}
                {...form.getInputProps("email")}
                required
              />

              <PasswordInput
                withAsterisk
                label="Password"
                placeholder="Password"
                leftSection={<FiLock />}
                {...form.getInputProps("password")}
                required
              />

              <Group mt="lg" justify="space-between">
                <Checkbox
                  label="Remember me"
                  {...form.getInputProps("rememberMe", { type: "checkbox" })}
                />
                <Anchor
                  component="button"
                  size="sm"
                  onClick={() => navigate("passwordReset")}
                >
                  Forgot password?
                </Anchor>
              </Group>
              <Button fullWidth mt="xl" w={340} type="submit">
                Sign in
              </Button>
            </form>
          </Box>

          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Do not have an account yet?{" "}
            <Anchor
              size="sm"
              component="button"
              onClick={() => navigate("register")}
            >
              Create account
            </Anchor>
          </Text>
        </Container>

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
      </div>
    </Box>
  );
};

export default Login;

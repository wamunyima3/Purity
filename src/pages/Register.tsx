import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { FaUser, FaUsers } from "react-icons/fa";
import { supabase } from "../utils/supabaseClient";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { IconX, IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import {
  TextInput,
  PasswordInput,
  Select,
  Anchor,
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
  Progress,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  LoadingOverlay,
  rem,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useState } from "react";

interface FormValues {
  firstname: string;
  surname: string;
  email: string;
  role: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { setColorScheme } = useMantineColorScheme();

  // Notification icons
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });
  const [visible, setVisible] = useState(false); // Loading overlay

  const signUpWithEmail = async (values: FormValues) => {
    setVisible(true);
    try {
      const { firstname, surname, email, role, password } = values;
      //signup
      const { error, data } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            firstname: firstname,
            surname: surname,
            role: role,
          },
          emailRedirectTo:
            role === "Supervisor"
              ? "https://purity-pm.vercel.app/supervisorDashboard"
              : "https://purity-pm.vercel.app/dashboard",
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        notifications.show({
          title: "Success!",
          message: `Verify the email sent to: ${data.user.email}`,
          icon: checkIcon,
          color: "green",
        });

        console.log(data.user);
      }
    } catch (error: any) {
      notifications.show({
        title: "Error!",
        message: error.message,
        icon: xIcon,
        color: "red",
      });
    } finally {
      setVisible(false);
    }
  };

  const requirements = [
    { re: /[0-9]/, label: "Includes number" },
    { re: /[a-z]/, label: "Includes lowercase letter" },
    { re: /[A-Z]/, label: "Includes uppercase letter" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
  ];

  function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
  }

  const [value, setPasswordValue] = useInputState("");
  const strength = getStrength(value);

  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ section: { transitionDuration: "0ms" } }}
        value={
          value.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
        key={index}
        size={4}
      />
    ));

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstname: "",
      surname: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      firstname: (value) =>
        /^[a-zA-Z]+(['-]?[a-zA-Z]+)*$/.test(value) ? null : "Invalid firstname",
      surname: (value) =>
        /^[a-zA-Z]+(['-]?[a-zA-Z]+)*$/.test(value) ? null : "Invalid surname",
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : "Invalid email",
      role: (value) => (!value ? "Invalid role" : null),
      password: () => (strength === 100 ? null : "Invalid password"),
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords did not match",
    },
  });

  form.watch("password", ({ value }) => {
    setPasswordValue(value);
  });

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "blue", type: "bars" }}
      />
      <div className="h-screen flex items-center justify-center select-none">
        <Container size={420} my={40}>
          <Title ta="center">Register</Title>

          <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit((values) => signUpWithEmail(values))}>
              <Group grow>
                <TextInput
                  withAsterisk
                  label="Firstname"
                  placeholder="Firstname"
                  leftSection={<FaUser />}
                  key={form.key("firstname")}
                  {...form.getInputProps("firstname")}
                  required
                />

                <TextInput
                  withAsterisk
                  label="Surname"
                  placeholder="Surname"
                  leftSection={<FaUser />}
                  key={form.key("surname")}
                  {...form.getInputProps("surname")}
                  required
                />
              </Group>

              <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                leftSection={<FiMail />}
                key={form.key("email")}
                {...form.getInputProps("email")}
                required
              />

              <Select
                withAsterisk
                label="Role"
                placeholder="Pick value"
                key={form.key("role")}
                {...form.getInputProps("role")}
                leftSection={<FaUsers />}
                data={["Student/Individual", "Supervisor"]}
                required
              />

              <PasswordInput
                withAsterisk
                label="Password"
                placeholder="Password"
                leftSection={<FiLock />}
                key={form.key("password")}
                {...form.getInputProps("password")}
                required
              />

              <Group gap={5} grow mt="4" mb="2">
                {bars}
              </Group>

              <PasswordInput
                withAsterisk
                label="Confirm Password"
                placeholder="Confirm password"
                key={form.key("confirmPassword")}
                leftSection={<FiLock />}
                {...form.getInputProps("confirmPassword")}
                required
              />

              <Button fullWidth mt="xl" type="submit">
                Sign up
              </Button>
            </form>
          </Box>

          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Already have an account?{" "}
            <Anchor size="sm" component="button" onClick={() => navigate("/")}>
              Login
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

export default Register;

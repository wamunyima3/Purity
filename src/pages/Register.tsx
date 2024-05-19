import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { FaUser, FaUsers } from "react-icons/fa";
import { supabase } from "../utils/supabaseClient";
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
  Center,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useForm } from "@mantine/form";

const Register = () => {
  const navigate = useNavigate();
  const signUpWithEmail = async () => {
    try {
      // Show a loading toast before making the request
      //login
      //   const { error, data } = await supabase.auth.signInWithUser({
      //     email: email,
      //     password: password
      //   });
      //   if (error) {
      //     throw error;
      //   }
      // Handle successful login and access user data
      //   console.log(data.user);
    } catch (error) {
      // Dismiss the loading toast in case of error
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
      role: (value) => ( !value ? "Invalid role" : null),
      password: () => (strength === 100 ? null : "Invalid password"),
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords did not match",
    },
  });

  form.watch("password", ({ value }) => {
    setPasswordValue(value);
  });

  return (
    <div className="h-screen flex items-center justify-center select-none">
      <Container size={420} my={40}>
        <Title ta="center">Register</Title>

        <Box maw={340} mx="auto">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
              {...form.getInputProps("props")}
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
    </div>
  );
};

export default Register;

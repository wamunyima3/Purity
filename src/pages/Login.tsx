import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { supabase } from "../utils/supabaseClient";
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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center select-none">
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
            <Button fullWidth mt="xl" w={340} type="submit" loading={loading}>
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
    </div>
  );
};

export default Login;

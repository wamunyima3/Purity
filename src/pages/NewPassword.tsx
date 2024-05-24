import {
  Title,
  Text,
  PasswordInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  ActionIcon,
  useMantineColorScheme,
  Progress,
  useComputedColorScheme,
  LoadingOverlay,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import {  FiLock } from "react-icons/fi";
import { IconArrowLeft } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useState } from "react";
import { IconX, IconCheck } from "@tabler/icons-react";
import { supabase } from "../utils/supabaseClient";
import { notifications } from "@mantine/notifications";

const NewPassword = () => {

  const { setColorScheme } = useMantineColorScheme();

  //notification icons
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });
  const [visible, setVisible] = useState(false); //loading overlay

  const navigate = useNavigate(); // for navigation

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

  interface FormValues {
    password: string;
    confirmPassword: string;
  }

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validate: {
      password: () => (strength === 100 ? null : "Invalid password"),
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords did not match",
    },
  });

  form.watch("password", ({ value }) => {
    setPasswordValue(value);
  });

  const resetPassword = async (values: FormValues) => {
    setVisible(true);
    try {
      const { password } = values;
      const { data, error } = await supabase.auth.updateUser({ password: password });

      if (error) throw error;

      //Go to another page to type password
      console.log(data);

      navigate("/");
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

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "blue", type: "bars" }}
      />
      <div className="relative h-screen flex items-center justify-center select-none">
        <Container size={460} my={30}>
          <Title ta="center">Stop forgetting!!</Title>
          <Text c="dimmed" fz="sm" ta="center">
            Enter your new password
          </Text>

          <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit((values) => resetPassword(values))}>
            <PasswordInput
                withAsterisk
                label="Password"
                placeholder="Password"
                leftSection={<FiLock />}
                key={form.key("password")}
                {...form.getInputProps("password")}
                w="336"
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
                      Login
                    </Box>
                  </Center>
                </Anchor>
                <Button
                  className="w-full text-center sm:w-auto sm:text-left"
                  type="submit"
                >
                  Update password
                </Button>
              </Group>
            </form>
          </Box>
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
  )
}

export default NewPassword

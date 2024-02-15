import { UserDataContext } from "@/pages/user";
import { UserResponse } from "@/types/user";
import { getServerErrorNoti, instance } from "@/utils";
import { Button, Group, PasswordInput, TextInput, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UseListStateHandlers } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useContext } from "react";

const CreateUserForm = ({
  handlers,
}: {
  handlers: UseListStateHandlers<UserResponse>;
}) => {
  const router = useRouter();
  const { page } = router.query;

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value.length < 6
          ? "Username should be at least 6 characters long"
          : null,
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
      password: (value) => {
        if (value.length < 6) {
          return "Password should be at least 6 characters long";
        }
        if (!/\d/.test(value)) {
          return "Password should contain at least one digit";
        }
        if (!/[a-z]/.test(value)) {
          return "Password should contain at least one lowercase letter";
        }
        if (!/[A-Z]/.test(value)) {
          return "Password should contain at least one uppercase letter";
        }
        if (!/\W/.test(value)) {
          return "Password should contain at least one special character";
        }
        return null;
      },
    },
  });

  const handleSubmit = async () => {
    form.validate();
    if (!form.isValid()) {
      return;
    }
    try {
      const { data }: { data: UserResponse } = await instance.post(
        "/users",
        form.values
      );
      notifications.show({
        title: "Success",
        message: "Create user successfully",
        color: "green",
      });
      form.reset();
      modals.closeAll();
      if (page === "1") {
        handlers.prepend(data);
        handlers.remove(5);
      } else {
        router.push({
          pathname: "/user",
          query: {
            page: 1,
          },
        });
      }
    } catch (error) {
      console.log("Check error: ", error);
      notifications.show({
        title: "Error",
        message: getServerErrorNoti(error),
        color: "red",
      });
    }
  };
  return (
    <>
      <TextInput
        label="Username"
        placeholder="Your username"
        required
        {...form.getInputProps("username")}
      />
      <TextInput
        mt="md"
        label="Email"
        placeholder="email@gmail"
        required
        {...form.getInputProps("email")}
      />
      <PasswordInput
        mt="md"
        label="Password"
        placeholder="Your password"
        required
        {...form.getInputProps("password")}
      />
      <Group mt={"md"} justify="end">
        <Button onClick={modals.closeAll} variant="default">
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Create</Button>
      </Group>
    </>
  );
};

const CreateUserBtn = () => {
  const { handlers }: { handlers: UseListStateHandlers<UserResponse> } =
    useContext(UserDataContext);
  const handleCreateUser = () => {
    modals.open({
      title: "Create User",
      children: <CreateUserForm handlers={handlers} />,
    });
  };

  return (
    <Button
      size="xs"
      variant="filled"
      color="teal"
      leftSection={<IconPlus style={{ width: rem(18), height: rem(18) }} />}
      onClick={handleCreateUser}
    >
      Add User
    </Button>
  );
};

export default CreateUserBtn;

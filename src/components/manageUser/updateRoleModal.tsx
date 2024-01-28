import PutRoleUserRequest from "@/types/users/PutRoleUserRequest";
import { getServerErrorNoti, instance } from "@/utils";
import { Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { UserResponse } from "@/types/user";
import { UserRole } from "@/types/users/UserRole";
import { useEffect } from "react";
interface IProps {
  user: UserResponse;
  users: UserResponse[];
  setUsers: (users: UserResponse[]) => void;
}

function UpdateRoleModal({ user, users, setUsers }: IProps) {
  const data = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "STAFF", label: "STAFF" },
    { value: "USER", label: "USER" },
  ];
  const form = useForm({
    initialValues: {
      role: "",
      banned: false,
    },
    validate: {
      role: (value) => (value.length === 0 ? "Role is required" : null),
    },
  });

  const formOnSubmit = form.onSubmit(
    (values) => console.log(values),
    (errors) => console.error(errors)
  );

  const handleUpdateState = () => {
    users.map((user) => {
      if (user.id === user.id) {
        user.role = UserRole[form.values.role as keyof typeof UserRole];
      }
    });
    setUsers(users);
  };

  const handleUpdateRole = async (id: number) => {
    form.validate();
    try {
      const { data }: { data: PutRoleUserRequest } = await instance.put(
        `/users/${id}`,
        form.values
      );
      notifications.show({
        title: "Success",
        message: "Update user successfully",
        color: "green",
      });
      modals.closeAll();
      handleUpdateState();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: getServerErrorNoti(error),
        color: "red",
      });
    }
  };

  useEffect(() => {
    form.setFieldValue("role", user.role);
  }, []);

  return (
    <form onSubmit={formOnSubmit}>
      <Select
        label="Role"
        placeholder="Pick a role"
        data={data}
        {...form.getInputProps("role")}
      />

      <Group mt="md">
        <Button
          type="submit"
          fullWidth
          onClick={() => handleUpdateRole(user.id)}
        >
          Save
        </Button>
      </Group>
    </form>
  );
}
export default UpdateRoleModal;

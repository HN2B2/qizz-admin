import PutRoleUserRequest from "@/types/users/PutRoleUserRequest";
import { getServerErrorNoti, instance } from "@/utils";
import { Button, Group, Select, Text } from "@mantine/core";
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
      banned: user.banned,
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

  const openConfirmUpdate = () =>
    modals.openConfirmModal({
      title: `Please confirm update role as ${form.values.role}`,
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleUpdateRole(user.id),
    });

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
    <>
      {user.role === "ADMIN" && (
        <Text c={"red"} size={"sm"} mb="md">
          The account's role is admin, you cannot update role.
        </Text>
      )}
      <form onSubmit={formOnSubmit}>
        <Select
          label="Role"
          placeholder="Pick a role"
          data={data}
          disabled={user.role === "ADMIN" ? true : false}
          {...form.getInputProps("role")}
        />

        <Group mt="md">
          {form.values.role === user.role ? (
            <Button
              type="submit"
              fullWidth
              disabled
              onClick={() => {
                openConfirmUpdate();
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              disabled={user.role === "ADMIN" ? true : false}
              onClick={() => {
                openConfirmUpdate();
              }}
            >
              Save
            </Button>
          )}
        </Group>
      </form>
    </>
  );
}
export default UpdateRoleModal;

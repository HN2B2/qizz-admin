import PutRoleUserRequest from "@/types/users/PutRoleUserRequest";
import { getServerErrorNoti, instance } from "@/utils";
import { Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
interface IProps {
  userId: number;
}

function UpdateRoleModal(props: IProps) {
  const { userId } = props;
  const data = [
    { value: "ADMIN" as any, label: "ADMIN" },
    { value: "STAFF" as any, label: "STAFF" },
    { value: "USER" as any, label: "USER" },
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
    } catch (error) {
      notifications.show({
        title: "Error",
        message: getServerErrorNoti(error),
        color: "red",
      });
    }
  };

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
          onClick={() => handleUpdateRole(userId)}
        >
          Save
        </Button>
      </Group>
    </form>
  );
}
export default UpdateRoleModal;

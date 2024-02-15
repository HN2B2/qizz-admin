import { getServerErrorNoti, instance } from "@/utils";
import { Button, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import UpdateBannedUserRequest from "@/types/users/UpdateBannedUserRequest";
import { UserResponse } from "@/types/user";
import { UseListStateHandlers } from "@mantine/hooks";
interface IProps {
  index: number;
  users: UserResponse[];
  handlers: UseListStateHandlers<UserResponse>;
}

function BannedModal({ index, users, handlers }: IProps) {
  const user = users[index];
  const form = useForm({
    initialValues: {
      role: user.role,
      banned: Boolean(user.banned),
    },
  });

  const handleBanUSer = async (id: number) => {
    form.values.banned = true;
    try {
      const { data }: { data: UpdateBannedUserRequest } = await instance.put(
        `/users/${id}`,
        form.values
      );
      notifications.show({
        title: "Success",
        message: "Ban user successfully",
        color: "green",
      });
      modals.closeAll();
      handlers.setItem(index, {
        ...user,
        banned: true,
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: getServerErrorNoti(error),
        color: "red",
      });
    }
  };

  const handleRemoveBanUser = async (id: number) => {
    form.values.banned = false;
    try {
      const { data }: { data: UpdateBannedUserRequest } = await instance.put(
        `/users/${id}`,
        form.values
      );
      notifications.show({
        title: "Success",
        message: "Remove ban for user successfully",
        color: "green",
      });
      modals.closeAll();
      handlers.setItem(index, {
        ...user,
        banned: false,
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: getServerErrorNoti(error),
        color: "red",
      });
    }
  };

  return (
    <>
      {user.role === "ADMIN" ? (
        <Text c={"red"} size="sm">
          You cannot ban an admin.
        </Text>
      ) : (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal.{user.banned === false ? " Ban" : " Remove Ban"} for username:
          <span style={{ fontWeight: "bold" }}> {user.username}. </span>
          Please click one of these buttons to proceed.
        </Text>
      )}
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={() => modals.closeAll()}>
          Close
        </Button>
        <Button
          disabled={user.role === "ADMIN" ? true : false}
          onClick={() => {
            user.banned === false
              ? handleBanUSer(user.id)
              : handleRemoveBanUser(user.id);
          }}
        >
          Comfirm
        </Button>
      </Group>
    </>
  );
}
export default BannedModal;

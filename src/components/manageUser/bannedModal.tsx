import { getServerErrorNoti, instance } from "@/utils";
import { Button, Group, Select, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import PutBannedUserRequest from "@/types/users/PutBannedUserRequest";
import { isBooleanObject } from "util/types";
interface IProps {
  username: string;
  userRole: string;
  userId: number;
  banned: boolean;
}

function BannedModal(props: IProps) {
  const { userRole, userId, banned, username } = props;

  const form = useForm({
    initialValues: {
      role: userRole,
      banned: Boolean(banned),
    },
  });

  const handleBanUSer = async (id: number) => {
    form.values.banned = true;
    try {
      const { data }: { data: PutBannedUserRequest } = await instance.put(
        `/users/${id}`,
        form.values
      );
      notifications.show({
        title: "Success",
        message: "Ban user successfully",
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

  const handleRemoveBanUser = async (id: number) => {
    form.values.banned = false;
    try {
      const { data }: { data: PutBannedUserRequest } = await instance.put(
        `/users/${id}`,
        form.values
      );
      notifications.show({
        title: "Success",
        message: "Remove ban for user successfully",
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
    <>
      <Text size="sm">
        This action is so important that you are required to confirm it with a
        modal.{banned === false ? " Ban" : " Remove Ban"} for username:
        <span style={{ fontWeight: "bold" }}> {username}. </span>
        Please click one of these buttons to proceed.
      </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={() => modals.closeAll()}>
          Close
        </Button>
        <Button
          onClick={() => {
            banned === false
              ? handleBanUSer(userId)
              : handleRemoveBanUser(userId);
          }}
        >
          Comfirm
        </Button>
      </Group>
    </>
  );
}
export default BannedModal;

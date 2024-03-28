import {
  NotificationResponse,
  UpdateNotificationRequest,
} from "@/types/notification";
import { getServerErrorNoti, instance } from "@/utils";
import {
  Button,
  Group,
  Notification,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { UseListStateHandlers } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { useEffect } from "react";

interface IProps {
  index: number;
  notifications: NotificationResponse[];
  handlers: UseListStateHandlers<NotificationResponse>;
}
const UpdateNotificationModal = ({
  index,
  notifications,
  handlers,
}: IProps) => {
  const notification = notifications[index];
  const handleUpdateNotification = async (id: number) => {
    form.validate();
    try {
      const data: UpdateNotificationRequest = await instance
        .put(`notifications/${id}`, {
          json: {
            title: form.values.title,
            content: form.values.content,
          },
        })
        .json();
      Notifications.show({
        title: "Success",
        message: "Update user successfully",
        color: "green",
      });
      modals.closeAll();
      handlers.setItem(index, {
        ...notification,
        title: form.values.title,
        content: form.values.content,
      });
    } catch (error) {
      Notifications.show({
        title: "Error",
        message: getServerErrorNoti(error),
        color: "red",
      });
    }
  };
  const form = useForm({
    initialValues: {
      title: notification.title,
      content: notification.content,
    },
    validate: {
      title: (value) =>
        value.length < 6 ? "Title should be at least 6 characters long" : null,
      content: (value) => (value.length == 0 ? "Content is required" : null),
    },
  });
  useEffect(() => {
    form.setFieldValue("title", notification.title);
    form.setFieldValue("content", notification.content);
  }, []);
  return (
    <>
      <TextInput
        label="Title"
        placeholder="Your title"
        required
        {...form.getInputProps("title")}
      />
      <Textarea
        mt="md"
        label="Content"
        placeholder="Your content"
        autosize
        minRows={2}
        maxRows={4}
        required
        {...form.getInputProps("content")}
      />
      <Group mt={"md"} justify="end">
        <Button onClick={modals.closeAll} variant="default">
          Cancel
        </Button>
        <Button onClick={() => handleUpdateNotification(notification.id)}>
          Update
        </Button>
      </Group>
    </>
  );
};
export default UpdateNotificationModal;

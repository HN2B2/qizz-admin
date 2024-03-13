import { NotificationResponse } from "@/types/notification";
import { convertDate } from "@/utils";
import { Divider, Modal, Text } from "@mantine/core";
import { UseListStateHandlers } from "@mantine/hooks";

interface IProps {
  index: number;
  notifications: NotificationResponse[];
  handlers: UseListStateHandlers<NotificationResponse>;
}

const NotificationDetailModal = ({
  index,
  notifications,
  handlers,
}: IProps) => {
  const notification = notifications[index];
  return (
    <>
      <Text fw={700} c="blue">Title</Text>
      <Text>{notification.title}</Text>
      <Divider my="md" />
      <Text fw={700} c="blue">Target type</Text>
      <Text>{notification.targetType}</Text>
      <Divider my="md" />
      <Text fw={700} c="blue">Content</Text>
      <Text>{notification.content}</Text>
      <Divider my="md" />
      <Text>Creater at {convertDate(notification.createdAt)}</Text>
    </>
  );
};
export default NotificationDetailModal;

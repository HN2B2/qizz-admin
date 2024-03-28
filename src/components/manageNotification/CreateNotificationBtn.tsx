import { NotificationDataContext } from "@/pages/notification";
import { NotificationResponse } from "@/types/notification";
import { getServerErrorNoti, instance } from "@/utils";
import { Button, Group, Select, TextInput, Textarea, rem } from "@mantine/core";
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
  handlers: UseListStateHandlers<NotificationResponse>;
}) => {
  const dataTarget = [
    { value: "ALL_PEOPLE", label: "ALL_PEOPLE" },
    { value: "ONLY_STAFF", label: "ONLY_STAFF" },
    { value: "ONLY_USER", label: "ONLY_USER" },
  ];
  const router = useRouter();
  const { page } = router.query;
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      targetType: "",
    },
    validate: {
      title: (value) =>
        value.length < 6 ? "Title should be at least 6 characters long" : null,
      content: (value) => (value.length === 0 ? "Content is required" : null),
      targetType: (value) => (value.length === 0 ? "Target is required" : null),
    },
  });

  const handleSubmit = async () => {
    form.validate();
    if (!form.isValid()) {
      return;
    }
    try {
      const data: NotificationResponse = await instance
        .post("notifications", {
          json: {
            title: form.values.title,
            content: form.values.content,
            targetType: form.values.targetType,
          },
        })
        .json();
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
          pathname: "/notification",
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
      <Select
        mt="md"
        label="Target type"
        placeholder="Pick a target type"
        required
        data={dataTarget}
        {...form.getInputProps("targetType")}
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
const CreateNotificationBtn = () => {
  const { handlers }: { handlers: UseListStateHandlers<NotificationResponse> } =
    useContext(NotificationDataContext);
  const handleCreateNotification = () => {
    modals.open({
      title: "Create Notification",
      children: <CreateUserForm handlers={handlers} />,
    });
  };

  return (
    <Button
      size="xs"
      variant="filled"
      color="teal"
      leftSection={<IconPlus style={{ width: rem(18), height: rem(18) }} />}
      onClick={() => handleCreateNotification()}
    >
      Add a notification
    </Button>
  );
};
export default CreateNotificationBtn;

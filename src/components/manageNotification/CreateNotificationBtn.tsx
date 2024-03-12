import { Button, Group, Select, TextInput, Textarea, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IconPlus } from "@tabler/icons-react";

const CreateUserForm = () => {
  const dataTarget = [
    { value: "ALL PEOPLE", label: "ALL PEOPLE" },
    { value: "STAFF", label: "STAFF" },
    { value: "USER", label: "USER" },
  ];
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      target: "",
    },
    validate: {
      title: (value) =>
        value.length < 6 ? "Title should be at least 6 characters long" : null,
      content: (value) => (value.length == 0 ? "Content is required" : null),
      target: (value) => (value.length == 0 ? "Target is required" : null),
    },
  });
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
        {...form.getInputProps("target")}
      />
      <Group mt={"md"} justify="end">
        <Button onClick={modals.closeAll} variant="default">
          Cancel
        </Button>
        <Button>Create</Button>
      </Group>
    </>
  );
};
const CreateNotificationBtn = () => {
  const handleCreateNotification = () => {
    modals.open({
      title: "Create Notification",
      children: <CreateUserForm />,
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

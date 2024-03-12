import { Button, Group, Select, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";

const UpdateNotificationModal = () => {
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
    },
    validate: {
      title: (value) =>
        value.length < 6 ? "Title should be at least 6 characters long" : null,
      content: (value) => (value.length == 0 ? "Content is required" : null),
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
      <Group mt={"md"} justify="end">
        <Button onClick={modals.closeAll} variant="default">
          Cancel
        </Button>
        <Button>Update</Button>
      </Group>
    </>
  );
};
export default UpdateNotificationModal;

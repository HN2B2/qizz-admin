import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalTitle,
  PasswordInput,
  TextInput,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { getServerErrorNoti, instance } from "@/utils";
import { notifications } from "@mantine/notifications";
import PostUserRequest from "@/types/users/PostUserRequest";

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (v: boolean) => void;
}
function CreateModal(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value.length < 6
          ? "Username should be at least 6 characters long"
          : null,
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
      password: (value) => {
        if (value.length < 6) {
          return "Password should be at least 6 characters long";
        }
        if (!/\d/.test(value)) {
          return "Password should contain at least one digit";
        }
        if (!/[a-z]/.test(value)) {
          return "Password should contain at least one lowercase letter";
        }
        if (!/[A-Z]/.test(value)) {
          return "Password should contain at least one uppercase letter";
        }
        if (!/\W/.test(value)) {
          return "Password should contain at least one special character";
        }
        return null;
      },
    },
  });

  const handleSubmit = async () => {
    form.validate();
    if (!form.isValid()) {
      return;
    }
    try {
      const { data }: { data: PostUserRequest } = await instance.post(
        "/users",
        form.values
      );
      notifications.show({
        title: "Success",
        message: "Create user successfully",
        color: "green",
      });
      handleCloseModal();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: getServerErrorNoti(error),
        color: "red",
      });
    }
  };

  const handleCloseModal = () => {
    form.values.email = "";
    form.values.username = "";
    form.values.password = "";
    setShowModalCreate(false);
  };

  return (
    <>
      <Modal.Root opened={showModalCreate} onClose={() => handleCloseModal()}>
        <Modal.Overlay />
        <ModalContent>
          <ModalHeader>
            <ModalTitle fw={700}>Create User</ModalTitle>
            <Modal.CloseButton />
          </ModalHeader>
          <ModalBody>
            <TextInput
              label="Username"
              placeholder="Your username"
              required
              {...form.getInputProps("username")}
            />
            <TextInput
              mt="md"
              label="Email"
              placeholder="email@gmail"
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              mt="md"
              label="Password"
              placeholder="Your password"
              required
              {...form.getInputProps("password")}
            />

            <Group justify="flex-end" mt="md" gap="xs">
              <Button variant="default" onClick={() => handleCloseModal()}>
                Close
              </Button>
              <Button
                type="submit"
                variant="primary"
                onClick={() => handleSubmit()}
              >
                Save
              </Button>
            </Group>
          </ModalBody>
        </ModalContent>
      </Modal.Root>
    </>
  );
}

export default CreateModal;

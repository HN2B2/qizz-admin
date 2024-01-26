"use client";
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
  Badge,
  NativeSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { getServerErrorNoti, instance } from "@/utils";
import { notifications } from "@mantine/notifications";
import PostUserRequest from "@/types/users/PostUserRequest";
import PutRoleUserRequest from "@/types/users/PutRoleUserRequest";

interface IProps {
  showModalUpdate: boolean;
  setshowModalUpdate: (v: boolean) => void;
  userId: number;
}
function UpdateRoleModal(props: IProps) {
  const { showModalUpdate, setshowModalUpdate } = props;
  const { userId } = props;
  const form = useForm({
    initialValues: {
      role: "",
      banned: false,
    },
    validate: {
      role: (value) => (value.length === 0 ? "Role is required" : null),
    },
  });

  const handleSubmit = async () => {
    form.validate();
    try {
      const { data }: { data: PutRoleUserRequest } = await instance.put(
        `/users/${userId}`,
        form.values
      );
      notifications.show({
        title: "Success",
        message: "Update user successfully",
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
    form.values.role = "";
    setshowModalUpdate(false);
  };

  return (
    <>
      <Modal.Root opened={showModalUpdate} onClose={() => handleCloseModal()}>
        <Modal.Overlay />
        <ModalContent>
          <ModalHeader>
            <ModalTitle fw={700}>Update User</ModalTitle>
            <Modal.CloseButton />
          </ModalHeader>
          <ModalBody>
            <NativeSelect
              label="Choose a role"
              description="Choose a role"
              data={["ADMIN", "STAFF", "USER"]}
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

export default UpdateRoleModal;

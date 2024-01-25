"use client";
import { Button, Modal, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

import { mutate } from "swr";
interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (v: boolean) => void;
}
function CreateModal(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;
  // const [title, setTitle] = useState<string>("");
  // const [author, setAuthor] = useState<string>("");
  // const [content, setContent] = useState<string>("");

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
    // const res = await fetch("/api/user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: form.values.username,
    //     email: form.values.email,
    //     password: form.values.password,
    //   }),
    // });
    // if (res.ok) {
    //   mutate("/api/user");
    //   setShowModalCreate(false);
    console
    // }
  };

  // const handleCloseModal = () => {
  //   setTitle("");
  //   setAuthor("");
  //   setContent("");
  //   setShowModalCreate(false);
  // };

  return (
    <>
      <Modal
        opened={showModalCreate}
        onClose={() => setShowModalCreate(false)}
        title="Add User"
      >
        <TextInput
          label="Username"
          placeholder="Username"
          {...form.getInputProps("username")}
        />
        <TextInput
          mt="md"
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          mt="md"
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />

        <Button variant="primary" onClick={() => handleSubmit()}>
          Save
        </Button>
      </Modal>
    </>
  );
}

export default CreateModal;

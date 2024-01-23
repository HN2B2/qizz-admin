import Head from "next/head";
import React from "react";
import AdminLayout, { BreadCrumbsItem } from "@/components/layouts/AdminLayout";
import { useEffect, useState } from "react";
import { Container, Title, getRadius } from "@mantine/core";
import { Breadcrumbs, Anchor } from "@mantine/core";
import cx from "clsx";
import { FaRegUser } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

import {
  Modal,
  Button,
  Menu,
  Grid,
  Flex,
  Paper,
  Space,
  Select,
  Box,
} from "@mantine/core";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaBan } from "react-icons/fa";
import { Stepper, TextInput, PasswordInput, Code } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
} from "@mantine/core";

import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";
import { BsThreeDots } from "react-icons/bs";
import { TiUserAddOutline } from "react-icons/ti";
const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Quiz Admin", link: "./" },
  { title: "User", link: "./user" },
];

const data = [
  {
    id: "1",
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
    name: "Robert Wolfkisser",
    role: "Admin",
    email: "rob_wolf@gmail.com",
  },
  {
    id: "2",
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
    name: "Jill Jailbreaker",
    role: "Staff",
    email: "jj@breaker.com",
  },
  {
    id: "3",
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    name: "Henry Silkeater",
    role: "User",
    email: "henry@silkeater.io",
  },
  {
    id: "4",
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
    name: "Bill Horsefighter",
    role: "User",
    email: "bhorsefighter@gmail.com",
  },
  {
    id: "5",
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
    name: "Jeremy Footviewer",
    role: "User",
    email: "jeremy@foot.dev",
  },
];

const UserPage = () => {
  const [opened, { open, close }] = useDisclosure(false);

  // const [openUpdateRole, { openUpdateRole, closeUpdateRole }] = useDisclosure(false);
  const [selection, setSelection] = useState(["1"]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const [submittedValues, setSubmittedValues] = useState("");

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      email: "",
      role: "",
    },
    
    validate: (values) => {
      
      if (active === 0) {
        return {
          username:
            values.username.trim().length < 6
              ? "Username must include at least 6 characters"
              : null,
          password:
            values.password.length < 6
              ? "Password must include at least 6 characters"
              : null,
        };
      }

      if (active === 1) {
        return {
          name:
            values.name.trim().length < 2
              ? "Name must include at least 2 characters"
              : null,
          email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
          role: values.role ? null : "Please select a role",
        };
      }

      return {};
    },
    
  });

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr key={item.id} className={cx({ ["active"]: selected })}>
        <Table.Td></Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.email}</Table.Td>
        <Table.Td>{item.role}</Table.Td>
        <Table.Td>
          <Menu shadow="md" width={170}>
            <Menu.Target>
              <ActionIcon variant="light" aria-label="Settings">
                <IconAdjustments
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  modals.open({
                    title: "Update Role for User",
                    children: (
                      <>
                        <Box maw={340} mx="auto">
                          <form
                            onSubmit={form.onSubmit((values) =>
                              setSubmittedValues(
                                JSON.stringify(values, null, 2)
                              )
                            )}
                          >
                            <Select
                              mt="md"
                              comboboxProps={{ withinPortal: true }}
                              data={["Admin", "Staff", "User"]}
                              defaultValue={`${form.values.role}`}
                              placeholder="Pick one"
                              label="Pick role"
                              {...form.getInputProps("role")}
                            />
                            <Button
                              type="submit"
                              fullWidth
                              onClick={() => modals.closeAll()}
                              mt="md"
                            >
                              Submit
                            </Button>
                          </form>
                        </Box>
                      </>
                    ),
                  });
                }}
                leftSection={
                  <FaRegUser style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Update Role
              </Menu.Item>

              <Menu.Item
                onClick={() =>
                  modals.open({
                    title: "Change Password",
                    children: (
                      <Box maw={340} mx="auto">
                        <form
                          onSubmit={form.onSubmit((values) =>
                            console.log(values)
                          )}
                        >
                          <PasswordInput
                            label="Password"
                            placeholder="Password"
                            {...form.getInputProps("password")}
                          />

                          <PasswordInput
                            mt="sm"
                            label="Confirm password"
                            placeholder="Confirm password"
                            {...form.getInputProps("confirmPassword")}
                          />

                          <Group justify="flex-end" mt="md">
                            <Button type="submit">Submit</Button>
                          </Group>
                        </form>
                      </Box>
                    ),
                  })
                }
                leftSection={
                  <RiLockPasswordLine
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                Change Password
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={
                  <FaBan style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Banned
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    );
  });

  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const [openModal, setOpenModal] = useState(false);

  const demoProps = {
    mt: "md",
  };

  return (
    <AdminLayout title="User" breadcrumbs={breadcrumbsItems}>
      <>
        <ScrollArea>
          <Container size={"xl"} {...demoProps}>
            <Paper
              shadow="md"
              style={{ marginBottom: "20px", marginTop: "10px" }}
            >
              <Flex justify="space-between" gap="lg" px={"md"} mt={"md"}>
                <TextInput
                  placeholder="Search"
                  size="xs"
                  w={600}
                  leftSection={
                    <IconSearch
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  }
                  rightSectionWidth={70}
                  styles={{ section: { pointerEvents: "none" } }}
                  mb="md"
                />

                <Group mb="md">
                  <Button onClick={open}>Add User</Button>
                  <Modal opened={opened} onClose={close} title="Add User">
                    <Stepper active={active}>
                      <Stepper.Step
                        label="First step"
                        description="Profile settings"
                      >
                        <TextInput
                          label="Username"
                          placeholder="Username"
                          {...form.getInputProps("username")}
                        />
                        <PasswordInput
                          mt="md"
                          label="Password"
                          placeholder="Password"
                          {...form.getInputProps("password")}
                        />
                      </Stepper.Step>

                      <Stepper.Step
                        label="Final step"
                        description="Personal information"
                      >
                        <TextInput
                          label="Name"
                          placeholder="Name"
                          {...form.getInputProps("name")}
                        />
                        <TextInput
                          mt="md"
                          label="Email"
                          placeholder="Email"
                          {...form.getInputProps("email")}
                        />
                        <Select
                          mt="md"
                          comboboxProps={{ withinPortal: true }}
                          data={["Admin", "Staff", "User"]}
                          placeholder="Pick one"
                          label="Pick role"
                          {...form.getInputProps("role")}
                        />
                      </Stepper.Step>

                      <Stepper.Completed>
                        Completed! Form values:
                        <Code block mt="xl">
                          {JSON.stringify(form.values, null, 2)}
                        </Code>
                      </Stepper.Completed>
                    </Stepper>

                    <Group justify="flex-end" mt="xl">
                      {active !== 0 && (
                        <Button variant="default" onClick={prevStep}>
                          Back
                        </Button>
                      )}
                      {active !== 3 && (
                        <Button onClick={nextStep}>Next step</Button>
                      )}
                    </Group>
                  </Modal>
                </Group>
              </Flex>
            </Paper>

            <Table miw={800} verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ width: rem(40) }}></Table.Th>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Container>
        </ScrollArea>
      </>
    </AdminLayout>
  );
};

export default UserPage;

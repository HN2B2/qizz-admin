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
import axios from "axios";

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
import { useForm, matchesField } from "@mantine/form";
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
import { UserResponse } from "@/types/user";
import GetAllUSerResponse from "@/types/users/GetAllUserResponse";
import { instance } from "@/utils";
import { Badge } from "@mantine/core";
import CreateModal from "./components/create.modal";
import UpdateRoleModal from "./components/updateRole.modal";
import AppTable from "./components/table";
const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Quiz Admin", link: "./" },
  { title: "User", link: "./user" },
];

//fetch data
const UserPage = (props: GetAllUSerResponse) => {
  const [users, setUsers] = useState<GetAllUSerResponse>({
    data: [],
    total: 0,
  });

  const fetchDataUsers = async () => {
    const res = await instance.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchDataUsers();
  });
  //fech data

  //table
  const rows = users.data.map((item, index) => {
    // const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);

    return (
      <Table.Tr key={item.id}>
        <Table.Td></Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar
              size={26}
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
              radius={26}
            />
            <Text size="sm" fw={500}>
              {item.username}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.email}</Table.Td>
        <Table.Td>
          <Badge
            variant="light"
            color={
              item.role === "ADMIN"
                ? "cyan"
                : item.role === "STAFF"
                ? "teal"
                : item.role === "USER"
                ? "green"
                : "red"
            }
          >
            {item.role}
          </Badge>
        </Table.Td>
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
                leftSection={
                  <FaRegUser style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Update Role
                {/* <UpdateRoleModal
                  userId={item.id}
                  showModalUpdate={showModalUpdate}
                  setshowModalUpdate={setShowModalUpdate}
                /> */}
              </Menu.Item>

              <Menu.Item
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
  //end table

  const demoProps = {
    mt: "md",
  };
  //end feature: Add User

  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);

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
                  <Button onClick={() => setShowModalCreate(true)}>
                    Add User
                  </Button>
                  <CreateModal
                    showModalCreate={showModalCreate}
                    setShowModalCreate={setShowModalCreate}
                  />
                </Group>
              </Flex>
            </Paper>

            {/* <Table miw={800} verticalSpacing="sm">
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
            </Table> */}
            <AppTable />
          </Container>
        </ScrollArea>
      </>
    </AdminLayout>
  );
};

export default UserPage;

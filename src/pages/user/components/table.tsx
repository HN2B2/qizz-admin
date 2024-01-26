"use client";

import { useEffect, useState } from "react";
import {
  ActionIcon,
  Avatar,
  Badge,
  Group,
  Menu,
  Select,
  Table,
  Text,
  rem,
} from "@mantine/core";
import GetAllUSerResponse from "@/types/users/GetAllUserResponse";
import { instance } from "@/utils";
import { IconAdjustments } from "@tabler/icons-react";
import { FaBan, FaRegUser } from "react-icons/fa6";
import UpdateRoleModal from "./updateRole.modal";
import { RiLockPasswordLine } from "react-icons/ri";

function AppTable() {
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

  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const rolesData = ["ADMIN", "USER", "STAFF"];
  return (
    <>
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
        <Table.Tbody>
          {users.data.map((item, index) => (
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

              {/* <Table.Td>
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
              </Table.Td> */}

              <Table.Td>
                <Select
                  data={rolesData}
                  defaultValue={item.role}
                  variant="unstyled"
                  allowDeselect={false}
                />
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
                        <FaRegUser
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      <div onClick={() => setShowModalUpdate(true)}>
                        Update Role
                      </div>
                    </Menu.Item>
                    <UpdateRoleModal
                      userId={item.id}
                      showModalUpdate={showModalUpdate}
                      setshowModalUpdate={setShowModalUpdate}
                    />
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
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}

export default AppTable;

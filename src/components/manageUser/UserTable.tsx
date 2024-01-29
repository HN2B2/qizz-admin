import { Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  ActionIcon,
  Avatar,
  Badge,
  Group,
  Menu,
  Table,
  Text,
  rem,
} from "@mantine/core";
import GetAllUSerResponse from "@/types/users/GetAllUserResponse";
import { IconAdjustments } from "@tabler/icons-react";
import { FaBan, FaRegUser } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { modals } from "@mantine/modals";
import { BannedModal, UpdateRoleModal } from ".";
import { UserRole } from "@/types/users/UserRole";
import { UserResponse } from "@/types/user";

interface UserTableProps {
  users: UserResponse[];
  setUsers: (users: UserResponse[]) => void;
}

function UserTable({ users, setUsers }: UserTableProps) {
  const getRoleBadge = (role: string) => {
    return (
      <Badge
        variant="light"
        color={
          role === "ADMIN"
            ? "cyan"
            : role === "STAFF"
            ? "teal"
            : role === "USER"
            ? "green"
            : "red"
        }
      >
        {UserRole[role as keyof typeof UserRole]}
      </Badge>
    );
  };

  const handleUpdateRole = (user: UserResponse) => {
    modals.open({
      title: "Update Role",
      children: (
        <UpdateRoleModal user={user} users={users} setUsers={setUsers} />
      ),
    });
  };

  const handleBannedUser = (
    banned: boolean,
    id: number,
    role: string,
    username: string
  ) => {
    modals.open({
      title: "Ban User",
      children: (
        <>
          <BannedModal
            userRole={role}
            userId={id}
            username={username}
            banned={banned}
          />
        </>
      ),
    });
  };

  return (
    <>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}></Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Banned</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((item, index) => (
            <Table.Tr
              key={item.id}
              bg={item.banned === false ? "" : "var(--mantine-color-red-light)"}
            >
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

              <Table.Td>{getRoleBadge(item.role)}</Table.Td>
              <Table.Td>{item.banned === false ? "False" : "True"}</Table.Td>

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
                    {/*start: Update Role */}
                    <Menu.Item
                      onClick={() => handleUpdateRole(item)}
                      leftSection={
                        <FaRegUser
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Update Role
                    </Menu.Item>
                    {/* end: Update Role  */}

                    {/* start: Banned User */}
                    {item.banned === false ? (
                      <Menu.Item
                        onClick={() => {
                          handleBannedUser(
                            item.banned,
                            item.id,
                            item.role,
                            item.username
                          );
                        }}
                        color="red"
                        leftSection={
                          <FaBan style={{ width: rem(14), height: rem(14) }} />
                        }
                      >
                        Banned
                      </Menu.Item>
                    ) : (
                      <Menu.Item
                        onClick={() => {
                          handleBannedUser(
                            item.banned,
                            item.id,
                            item.role,
                            item.username
                          );
                        }}
                        color="green"
                        leftSection={
                          <FaBan style={{ width: rem(14), height: rem(14) }} />
                        }
                      >
                        UnBan
                      </Menu.Item>
                    )}
                    {/* end: Banned User */}
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

export default UserTable;

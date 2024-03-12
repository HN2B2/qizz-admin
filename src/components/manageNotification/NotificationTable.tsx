import { ActionIcon, Group, Menu, Table, rem } from "@mantine/core";
import { FaEdit } from "react-icons/fa";
import { IconAdjustments } from "@tabler/icons-react";
import { GrView } from "react-icons/gr";
import { modals } from "@mantine/modals";
import { NotificationDetailModal, UpdateNotificationModal } from ".";

const NotificationTable = () => {
  const handleViewDetail = () => {
    modals.open({
      title: "Notification Detail",
      children: (
        <>
          <NotificationDetailModal />
        </>
      ),
    });
  };

  const handleUpdateNotification = () => {
    modals.open({
      title: "Edit Notification",
      children: (
        <>
          <UpdateNotificationModal />
        </>
      ),
    });
  };
  return (
    <>
      <Table miw={800} verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}></Table.Th>
            <Table.Th>#</Table.Th>
            <Table.Th>Message</Table.Th>
            <Table.Th>Create At</Table.Th>
            <Table.Th>Modify At</Table.Th>
            <Table.Th>Target Type</Table.Th>
            <Table.Th>Checked</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td></Table.Td>
            <Table.Td>1</Table.Td>
            <Table.Td>update notification</Table.Td>

            <Table.Td>12/03/2002</Table.Td>

            <Table.Td>12/03/2002</Table.Td>
            <Table.Td>All people</Table.Td>
            <Table.Td>5</Table.Td>

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
                    onClick={() => handleViewDetail()}
                    leftSection={
                      <GrView style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    View Detail
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => handleUpdateNotification()}
                    leftSection={
                      <FaEdit style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Edit Notification
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </>
  );
};
export default NotificationTable;

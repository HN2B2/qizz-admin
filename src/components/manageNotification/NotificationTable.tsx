import {
  ActionIcon,
  Box,
  Center,
  Group,
  Menu,
  Table,
  Text,
  rem,
} from "@mantine/core";
import { FaEdit } from "react-icons/fa";
import { IconAdjustments } from "@tabler/icons-react";
import { GrView } from "react-icons/gr";
import { modals } from "@mantine/modals";
import { NotificationDetailModal, UpdateNotificationModal } from ".";
import { NotificationResponse } from "@/types/notification";
import { useContext } from "react";
import { UseListStateHandlers } from "@mantine/hooks";
import { NotificationDataContext, PAGE_SIZE } from "@/pages/notification";
import { useRouter } from "next/router";
import { convertDate } from "@/utils";

const NotificationTable = () => {
  const {
    notifications,
    handlers,
  }: {
    notifications: NotificationResponse[];
    handlers: UseListStateHandlers<NotificationResponse>;
  } = useContext(NotificationDataContext);
  const handleViewDetail = (index: number) => {
    modals.open({
      title: "Notification Detail",
      children: (
        <>
          <NotificationDetailModal
            index={index}
            notifications={notifications}
            handlers={handlers}
          />
        </>
      ),
    });
  };

  const handleUpdateNotification = (index: number) => {
    modals.open({
      title: "Edit Notification",
      children: (
        <>
          <UpdateNotificationModal
            index={index}
            notifications={notifications}
            handlers={handlers}
          />
        </>
      ),
    });
  };

  const router = useRouter();
  const { page } = router.query;
  const baseIndex = parseInt(page as string) * PAGE_SIZE - PAGE_SIZE + 1 || 1;

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
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {notifications.map((item, index) => (
            <Table.Tr key={item.id}>
              <Table.Td></Table.Td>
              <Table.Td>{baseIndex + index}</Table.Td>
              <Table.Td>{item.title}</Table.Td>

              <Table.Td>{convertDate(item.createdAt)}</Table.Td>

              <Table.Td>{convertDate(item.modifiedAt)}</Table.Td>
              <Table.Td>{item.targetType}</Table.Td>

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
                      onClick={() => handleViewDetail(index)}
                      leftSection={
                        <GrView style={{ width: rem(14), height: rem(14) }} />
                      }
                    >
                      View Detail
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => handleUpdateNotification(index)}
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
          ))}
        </Table.Tbody>
      </Table>
      {notifications.length === 0 && (
        <Center maw={1100} h={100}>
          <Box>
            <Text c={"red"} size="lg">
              No Data Found
            </Text>
          </Box>
        </Center>
      )}
    </>
  );
};
export default NotificationTable;

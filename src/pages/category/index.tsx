import Head from "next/head";
import React from "react";
import AdminLayout, { BreadCrumbsItem } from "@/components/layouts/AdminLayout";
import { useEffect, useState } from "react";
import { MultiSelect, Select, Stack } from "@mantine/core";
import { Pagination } from "@mantine/core";
import {
  Button,
  Flex,
  Title,
  getRadius,
  Modal,
  Box,
  TabsPanel,
  Table,
  ActionIcon,
} from "@mantine/core";
import { Breadcrumbs, Anchor, Text, Paper, Tabs } from "@mantine/core";
// import { useDisclosure, randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  ScrollArea,
  UnstyledButton,
  Group,
  Center,
  TextInput,
  rem,
  keys,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconDownload,
  IconCreativeCommons,
  IconPlus,
  IconEdit,
  IconView360,
  IconViewportWide,
  IconViewfinder,
  IconViewportNarrow,
  IconPackage,
  IconEye,
  IconX,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";

const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Quiz Admin", link: "./" },
  { title: "Category", link: "./category" },
];
const iconStyle = { width: rem(12), height: rem(12) };

const data = [
  {
    id: 1,
    name: "Athena Weissnat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolore.",
    createdAt: "20-01-2024",
    modifiedAt: "20-01-2024",
  },
  {
    id: 2,
    name: "Athena Weissnat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolore.",
    createdAt: "20-01-2024",
    modifiedAt: "20-01-2024",
  },
  {
    id: 3,
    name: "Athena Weissnat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolore.",
    createdAt: "20-01-2024",
    modifiedAt: "20-01-2024",
  },
  {
    id: 4,
    name: "Athena Weissnat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolore.",
    createdAt: "20-01-2024",
    modifiedAt: "20-01-2024",
  },
  {
    id: 5,
    name: "Athena Weissnat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolore.",
    createdAt: "20-01-2024",
    modifiedAt: "20-01-2024",
  },
  {
    id: 6,
    name: "Athena Weissnat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolore.",
    createdAt: "20-01-2024",
    modifiedAt: "20-01-2024",
  },
];

const subData = [
  {
    name: "Sub Category 1",
    createdAt: "20-01-2024",
    modifiedAt: "20-01-2024",
  },
  {
    name: "Sub Category 2",
    createdAt: "20-01-2024",
    modifiedAt: "20-01-2024",
  },
  {
    name: "Sub Category 3",
    createdAt: "20-01-2024",
    modifiedAt: "20-01-2024",
  },
];

const CategoryPage = () => {
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
  });
  const openModal = () =>
    modals.openConfirmModal({
      title: "Category Form",
      children: (
        <Box maw={340} mx="auto">
          <TextInput
            label="Name"
            placeholder="Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            mt="md"
            label="Description"
            placeholder="Description"
            {...form.getInputProps("description")}
          />
        </Box>
      ),
      labels: { confirm: "Save", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Save"),
    });

  const creatSubModal = () =>
    modals.openConfirmModal({
      title: "Sub-Category Form",
      children: (
        <Box maw={340} mx="auto">
          <TextInput
            label="Name"
            placeholder="Name"
            {...form.getInputProps("name")}
          />
        </Box>
      ),
      labels: { confirm: "Save", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Save"),
    });

  const handleViewCategory = (category: Category) =>
    modals.open({
      title: "View Category",
      size: "xl",
      children: (
        <Box mx="auto">
          <Stack>
            <Group>
              <Title order={5}>Category:</Title>
              <Text>{category.name}</Text>
            </Group>
            <Group wrap="nowrap">
              <Title order={5}>Description:</Title>
              <Text>{category.description}</Text>
            </Group>
            <Group>
              <Table
                horizontalSpacing="md"
                verticalSpacing="xs"
                miw={700}
                layout="fixed"
              >
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>CreatedAt</Table.Th>
                    <Table.Th>ModifiedAt</Table.Th>
                    <Table.Th>
                      <ActionIcon color="blue" onClick={() => creatSubModal()}>
                        <IconPlus {...iconStyle} />
                      </ActionIcon>
                    </Table.Th>
                  </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>{subRows}</Table.Tbody>
              </Table>
            </Group>
          </Stack>
        </Box>
      ),
    });

  const editForm = useForm({
    initialValues: {
      name: "",
      description: "",
    },
  });
  const handleEditCategory = (category: Category) => {
    editForm.setValues({
      name: category.name,
      description: category.description,
    });
    modals.openConfirmModal({
      title: "Category Form",
      children: (
        <Box maw={340} mx="auto">
          <TextInput
            label="Name"
            placeholder="Name"
            {...editForm.getInputProps("name")}
          />
          <TextInput
            mt="md"
            label="Description"
            placeholder="Description"
            {...editForm.getInputProps("description")}
          />
        </Box>
      ),
      labels: { confirm: "Save", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Save"),
    });
  };

  const confirmModal = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          Are you sure? After deleted, you can't undo this action.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  const rows = data.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>
        <Text lineClamp={2}>{row.description}</Text>
      </Table.Td>
      <Table.Td>{row.createdAt}</Table.Td>
      <Table.Td>{row.modifiedAt}</Table.Td>
      <Table.Td>
        <Group gap={6}>
          <ActionIcon variant="filled" aria-label="Settings">
            <IconEdit
              onClick={() => handleEditCategory(row)}
              size={"1rem"}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon variant="filled" aria-label="Settings">
            <IconEye
              onClick={() => handleViewCategory(row)}
              size={"1rem"}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon variant="filled" aria-label="Settings">
            <IconX onClick={() => confirmModal()} size={"1rem"} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const subRows = subData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.createdAt}</Table.Td>
      <Table.Td>{row.modifiedAt}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon>
            <IconEdit size={"1rem"} stroke={1.5} />
          </ActionIcon>
          <ActionIcon>
            <IconX onClick={() => confirmModal()} size={"1rem"} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const [activePage, setPage] = useState(1);
  return (
    <AdminLayout title="Category" breadcrumbs={breadcrumbsItems}>
      <Paper shadow="md" style={{ marginBottom: "20px", marginTop: "10px" }}>
        <Flex justify="space-between" gap="lg" px={"md"} mt={"md"}>
          <TextInput
            placeholder="Search by any field"
            mb="md"
            w={600}
            leftSection={
              <IconSearch
                style={{ width: rem(24), height: rem(24) }}
                stroke={1.5}
              />
            }
            // value={search}
            // onChange={handleSearchChange}
          />
          <Group mb="md">
            <Select
              placeholder="Sort by"
              data={["Default", "Lasted", "Newest"]}
              defaultValue={"Default"}
            />
            <Button onClick={openModal} rightSection={<IconPlus size={16} />}>
              Create
            </Button>
          </Group>
        </Flex>
      </Paper>
      <Paper shadow="md" style={{ paddingTop: "10px" }}>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          layout="fixed"
        >
          <Table.Tbody>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>CreatedAt</Table.Th>
              <Table.Th>Modifed_at</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
      <Paper shadow="md" mt={10} p={10}>
        <Flex justify="center">
          <Pagination total={10} value={activePage} onChange={setPage} />
        </Flex>
      </Paper>
    </AdminLayout>
  );
};

export default CategoryPage;

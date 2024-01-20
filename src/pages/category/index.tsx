import Head from "next/head";
import React from "react";
import AdminLayout, { BreadCrumbsItem } from "@/components/layouts/AdminLayout";
import { useEffect, useState } from "react";
import { MultiSelect, Select } from "@mantine/core";
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
import { useDisclosure, randomId } from "@mantine/hooks";
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
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";

const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Quiz Admin", link: "./" },
  { title: "Category", link: "./category" },
];
const iconStyle = { width: rem(12), height: rem(12) };

const data = [
  {
    id: "001",
    name: "Athena Weissnat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolore.",
    created_at: "20-01-2024",
    modified_at: "20-01-2024",
  },
  {
    id: "002",
    name: "Athena Weissnat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolore.",
    created_at: "20-01-2024",
    modified_at: "20-01-2024",
  },
  {
    id: "003",
    name: "Athena Weissnat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolore.",
    created_at: "20-01-2024",
    modified_at: "20-01-2024",
  },
  {
    id: "004",
    name: "Athena Weissnat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolore.",
    created_at: "20-01-2024",
    modified_at: "20-01-2024",
  },
  {
    id: "005",
    name: "Athena Weissnat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolore.",
    created_at: "20-01-2024",
    modified_at: "20-01-2024",
  },
  {
    id: "006",
    name: "Athena Weissnat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolore.",
    created_at: "20-01-2024",
    modified_at: "20-01-2024",
  },
];

const CategoryPage = () => {
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
  });

  const rows = data.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>
        <Text lineClamp={2}>{row.description}</Text>
      </Table.Td>
      <Table.Td>{row.created_at}</Table.Td>
      <Table.Td>{row.modified_at}</Table.Td>
      <Table.Td>
        <ActionIcon variant="filled" aria-label="Settings">
          <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));
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
              <Table.Th>Created_at</Table.Th>
              <Table.Th>Modifed_at</Table.Th>
              <Table.Th>Edit</Table.Th>
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

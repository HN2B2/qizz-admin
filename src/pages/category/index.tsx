import Head from "next/head";
import React from "react";
import AdminLayout, { BreadCrumbsItem } from "@/components/layouts/AdminLayout";
import { useEffect, useState } from "react";
import { Button, Flex, Title, getRadius, Modal, Box } from "@mantine/core";
import { Breadcrumbs, Anchor, Text, Paper, Tabs } from "@mantine/core";
import { useDisclosure, randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconBrandPagekit,
} from "@tabler/icons-react";
import {
  Table,
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
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";

const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Quiz Admin", link: "./" },
  { title: "Category", link: "./category" },
];
const iconStyle = { width: rem(12), height: rem(12) };

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
  return (
    <AdminLayout title="Category" breadcrumbs={breadcrumbsItems}>
      <Paper>
        <Flex justify="center" gap="lg">
          <TextInput
            placeholder="Search by any field"
            mb="md"
            leftSection={
              <IconSearch
                style={{ width: rem(24), height: rem(24) }}
                stroke={1.5}
              />
            }
            // value={search}
            // onChange={handleSearchChange}
          />
          <Button onClick={openModal} rightSection={<IconPlus size={16} />}>
            Create
          </Button>
        </Flex>
        <Tabs defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab
              value="gallery"
              leftSection={<IconBrandPagekit style={iconStyle} />}
            >
              Category
            </Tabs.Tab>
            <Tabs.Tab
              value="messages"
              leftSection={<IconBrandPagekit style={iconStyle} />}
            >
              Sub-Category
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery">
            <Table
              horizontalSpacing="md"
              verticalSpacing="xs"
              miw={700}
              layout="fixed"
            >
              <Table.Tbody>
                <Table.Tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                </Table.Tr>
              </Table.Tbody>
              <Table.Tbody>
                {
                  <Table.Tr>
                    <Table.Td>
                      {/* <Text fw={500} ta="center">
                  Nothing found
                </Text> */}
                    </Table.Td>
                  </Table.Tr>
                }
              </Table.Tbody>
            </Table>
          </Tabs.Panel>

          <Tabs.Panel value="messages">
            <Table
              horizontalSpacing="md"
              verticalSpacing="xs"
              miw={700}
              layout="fixed"
            >
              <Table.Tbody>
                <Table.Tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                </Table.Tr>
              </Table.Tbody>
              <Table.Tbody>
                {
                  <Table.Tr>
                    <Table.Td>
                      {/* <Text fw={500} ta="center">
                  Nothing found
                </Text> */}
                    </Table.Td>
                  </Table.Tr>
                }
              </Table.Tbody>
            </Table>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </AdminLayout>
  );
};

export default CategoryPage;

import { CategoryDataContext, PAGE_SIZE } from "@/pages/category";
import { Category, SubCategory } from "@/types/category";
import { convertDate, getServerErrorNoti, instance } from "@/utils";
import {
  ActionIcon,
  Button,
  Drawer,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { UseListStateHandlers, useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { SubCategoryTable } from "../subcategory";
import { useForm } from "@mantine/form";

const DrawerContent = ({
  category,
  close,
  index,
}: {
  category: Category;
  close: () => void;
  index: number;
}) => {
  const { handlers }: { handlers: UseListStateHandlers<Category> } =
    useContext(CategoryDataContext);
  const showConfirmDeleteCat = () => {
    modals.openConfirmModal({
      title: "Delete category",
      children: "Are you sure you want to delete this category?",
      labels: {
        confirm: "Delete",
        cancel: "Cancel",
      },
      onCancel: () => {},
      onConfirm: () => handleDeleteCategory(),
    });
  };

  const router = useRouter();
  const handleDeleteCategory = async () => {
    try {
      await instance.delete(`/categories/${category.id}`);
      router.reload();
      notifications.show({
        color: "teal",
        title: "Success",
        message: "Delete category successfully",
      });
      modals.closeAll();
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategoryForm = useForm({
    initialValues: {
      name: category.name,
      description: category.description,
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
    },
  });

  const handleUpdateCategory = async () => {
    updateCategoryForm.validate();

    if (!updateCategoryForm.isValid()) {
      return;
    }
    try {
      const { data }: { data: Category } = await instance.put(
        `/categories/${category.id}`,
        { ...category, ...updateCategoryForm.values }
      );
      notifications.show({
        color: "teal",
        title: "Success",
        message: "Update category successfully",
      });
      handlers.setItem(index, data);
      close();
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error",
        message: getServerErrorNoti(error),
      });
    }
  };
  return (
    <Stack h="100%" justify="space-between">
      <Group grow mb={"md"}>
        <TextInput
          label="Name"
          placeholder="Category name"
          {...updateCategoryForm.getInputProps("name")}
        />
        <TextInput
          label="Description"
          placeholder="Category description"
          {...updateCategoryForm.getInputProps("description")}
        />
      </Group>
      <SubCategoryTable
        subCategories={category.subCategories}
        categoryId={category.id}
      />
      <Group justify="space-between" mt={"md"}>
        <Button color="red" onClick={showConfirmDeleteCat}>
          Delete
        </Button>
        <Group>
          <Button variant="light" onClick={() => router.reload()}>
            Cancel
          </Button>
          <Button variant="filled" onClick={handleUpdateCategory}>
            Save
          </Button>
        </Group>
      </Group>
    </Stack>
  );
};

const CategoryRow = ({
  index,
  category,
}: {
  index: number;
  category: Category;
}) => {
  const router = useRouter();
  const { page = "1" } = router.query;
  const [opened, { open, close }] = useDisclosure(false);
  const indexNum = (parseInt(page as string) - 1) * PAGE_SIZE + index + 1;
  1;
  return (
    <>
      <Table.Tr>
        <Table.Td>
          <Text fw={500}>{indexNum}</Text>
        </Table.Td>
        <Table.Td>
          <Text lineClamp={1}>{category.name}</Text>
        </Table.Td>
        <Table.Td>
          <Text lineClamp={1}>{category.description}</Text>
        </Table.Td>
        <Table.Td>
          <Text lineClamp={1}>{convertDate(category.createdAt)}</Text>
        </Table.Td>
        <Table.Td>
          <Text lineClamp={1}>{category.subCategories.length}</Text>
        </Table.Td>
        <Table.Td>
          <ActionIcon variant="default" onClick={open}>
            <IconEdit size={"1rem"} stroke={1.5} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
      <Drawer
        opened={opened}
        onClose={close}
        title={"Manage category"}
        position="right"
        size={"50%"}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <DrawerContent category={category} close={close} index={index} />
      </Drawer>
    </>
  );
};

const CategoryTable = () => {
  const {
    categoryList,
  }: {
    categoryList: Category[];
  } = useContext(CategoryDataContext);

  return (
    <Table verticalSpacing={"md"} highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>#</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Created at</Table.Th>
          <Table.Th>Total subcategories</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {categoryList.map((category, index) => (
          <CategoryRow
            index={index}
            category={category}
            key={category.id + 1}
          />
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default CategoryTable;

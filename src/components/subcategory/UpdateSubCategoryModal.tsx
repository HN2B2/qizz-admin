import { SubCategory } from "@/types/category"
import { getServerErrorNoti, instance } from "@/utils"
import { Button, Group, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { UseListStateHandlers } from "@mantine/hooks"
import { modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"

const UpdateSubCategoryModal = ({
    subCategory,
    handlers,
    index,
    categoryId,
}: {
    subCategory: SubCategory
    handlers: UseListStateHandlers<SubCategory>
    index: number
    categoryId: number
}) => {
    const updateSubCategoryForm = useForm({
        initialValues: {
            name: subCategory.name,
            description: subCategory.description,
        },
        validate: {
            name: (value) =>
                value.trim().length > 0 ? null : "Name is required",
        },
    })
    const handleUpdateSubCategory = async () => {
        updateSubCategoryForm.validate()
        if (!updateSubCategoryForm.isValid) {
            return
        }
        try {
            const { data }: { data: SubCategory } = await instance.put(
                `/subcategories/${categoryId}/${subCategory.id}`,
                updateSubCategoryForm.values
            )
            notifications.show({
                color: "teal",
                title: "Success",
                message: "Update subcategory successfully",
            })
            modals.closeAll()
            updateSubCategoryForm.reset()
            handlers.setItem(index, data)
        } catch (error) {
            notifications.show({
                color: "red",
                title: "Error",
                message: getServerErrorNoti(error),
            })
        }
    }
    return (
        <Stack>
            <TextInput
                withAsterisk
                label="Name"
                placeholder="New category name"
                {...updateSubCategoryForm.getInputProps("name")}
            />
            <TextInput
                label="Description"
                placeholder="New category description"
                {...updateSubCategoryForm.getInputProps("description")}
            />
            <Group justify="end">
                <Button variant="default" onClick={() => modals.closeAll}>
                    Cancel
                </Button>
                <Button type="submit" onClick={() => handleUpdateSubCategory()}>
                    Update
                </Button>
            </Group>
        </Stack>
    )
}

export default UpdateSubCategoryModal

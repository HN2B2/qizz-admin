import { SubCategory } from "@/types/category"
import { getServerErrorNoti, instance } from "@/utils"
import { Button, Group, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { UseListStateHandlers } from "@mantine/hooks"
import { modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"
import { IconPlus } from "@tabler/icons-react"
import { useRouter } from "next/router"
import React from "react"

const CreateNewSubCategoryModal = ({
    categoryId,
    currentPage,
    handleChangePage,
    handlers,
}: {
    categoryId: number
    currentPage: number
    handleChangePage: (value: number) => void
    handlers: UseListStateHandlers<SubCategory>
}) => {
    const newSubCategoryForm = useForm({
        initialValues: {
            name: "",
            description: "",
        },
        validate: {
            name: (value) =>
                value.trim().length > 0 ? null : "Name is required",
            description: (value) =>
                value.trim().length > 0 ? null : "Description is required",
        },
    })

    const handleCreateNewSubCategory = async () => {
        newSubCategoryForm.validate()
        if (!newSubCategoryForm.isValid()) {
            return
        }
        try {
            const { data }: { data: SubCategory } = await instance.post(
                `/subcategories/${categoryId}`,
                newSubCategoryForm.values
            )
            modals.closeAll()
            newSubCategoryForm.reset()
            notifications.show({
                color: "teal",
                title: "Success",
                message: "Create new subcategory successfully",
            })
            handlers.append(data)
            handleChangePage(currentPage)
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
                {...newSubCategoryForm.getInputProps("name")}
            />
            <TextInput
                withAsterisk
                label="Description"
                placeholder="New category description"
                {...newSubCategoryForm.getInputProps("description")}
            />
            <Group justify="end">
                <Button variant="default" onClick={() => modals.closeAll()}>
                    Cancel
                </Button>
                <Button
                    color="teal"
                    type="submit"
                    onClick={handleCreateNewSubCategory}
                >
                    Create
                </Button>
            </Group>
        </Stack>
    )
}

const CreateNewSubCategoryBtn = ({
    categoryId,
    currentPage,
    handleChangePage,
    handlers,
}: {
    categoryId: number
    currentPage: number
    handleChangePage: (value: number) => void
    handlers: UseListStateHandlers<SubCategory>
}) => {
    const handleCreateNewSubCategoryModal = () => {
        modals.open({
            title: "Create new subcategory",
            children: (
                <CreateNewSubCategoryModal
                    categoryId={categoryId}
                    currentPage={currentPage}
                    handleChangePage={handleChangePage}
                    handlers={handlers}
                />
            ),
        })
    }
    return (
        <Button
            fullWidth
            variant="outline"
            leftSection={<IconPlus size={"1rem"} stroke={1.5} />}
            onClick={handleCreateNewSubCategoryModal}
        >
            Create new subcategory
        </Button>
    )
}

export default CreateNewSubCategoryBtn

import { CategoryDataContext, PAGE_SIZE } from "@/pages/category"
import { Category } from "@/types/category"
import { getServerErrorNoti, instance } from "@/utils"
import { Button, Group, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { UseListStateHandlers } from "@mantine/hooks"
import { modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"
import { IconPlus } from "@tabler/icons-react"
import { useRouter } from "next/router"
import { useContext } from "react"

const CreateCategoryModal = ({
    handlers,
}: {
    handlers: UseListStateHandlers<Category>
}) => {
    const newCategoryForm = useForm({
        initialValues: {
            name: "",
            description: "",
        },
        validate: {
            name: (value) =>
                value.trim().length > 0 ? null : "Name is required",
        },
    })

    const router = useRouter()
    const { page = "1" } = router.query
    const handleCreateNewCategory = async () => {
        newCategoryForm.validate()
        if (!newCategoryForm.isValid) {
            return
        }
        try {
            const { data }: { data: Category } = await instance.post(
                "/categories",
                newCategoryForm.values
            )
            notifications.show({
                color: "teal",
                title: "Success",
                message: "Create new category successfully",
            })
            modals.closeAll()
            newCategoryForm.reset()
            if (page === "1") {
                handlers.prepend(data)
                handlers.remove(PAGE_SIZE)
            } else {
                router.push({
                    pathname: "/category",
                    query: {
                        page: "1",
                    },
                })
            }
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
                {...newCategoryForm.getInputProps("name")}
            />
            <TextInput
                label="Description"
                placeholder="New category description"
                {...newCategoryForm.getInputProps("description")}
            />
            <Group justify="end">
                <Button variant="default" onClick={() => modals.closeAll}>
                    Cancel
                </Button>
                <Button
                    color="teal"
                    type="submit"
                    onClick={() => handleCreateNewCategory()}
                >
                    Create
                </Button>
            </Group>
        </Stack>
    )
}

const CreateCategoryBtn = () => {
    const { handlers }: { handlers: UseListStateHandlers<Category> } =
        useContext(CategoryDataContext)
    const handleOpenCreateCategoryModal = () => {
        modals.open({
            title: "Create new category",
            children: <CreateCategoryModal handlers={handlers} />,
            size: "lg",
        })
    }

    return (
        <Button
            color="teal"
            leftSection={<IconPlus size={"1rem"} />}
            onClick={handleOpenCreateCategoryModal}
        >
            Create category
        </Button>
    )
}

export default CreateCategoryBtn

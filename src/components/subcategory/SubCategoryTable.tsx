import { SubCategory } from "@/types/category"
import { useListState } from "@mantine/hooks"
import { modals } from "@mantine/modals"
import { CreateNewSubCategoryBtn, UpdateSubCategoryModal } from "."
import { ActionIcon, Group, Pagination, Table, Text } from "@mantine/core"
import { convertDate, getServerErrorNoti, instance } from "@/utils"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import { notifications } from "@mantine/notifications"

const PAGE_SIZE = 5

const SubCategoryTable = ({
    subCategories,
    categoryId,
}: {
    subCategories: SubCategory[]
    categoryId: number
}) => {
    const [subCategoryList, handlers] = useListState(subCategories)
    const [currentPage, setCurrentPage] = useState(1)
    const [renderList, setRenderList] = useState<SubCategory[]>(
        subCategoryList.slice(0, PAGE_SIZE)
    )

    const handleChangePage = (page: number) => {
        setCurrentPage(page)
        const start = (page - 1) * PAGE_SIZE
        const end = start + PAGE_SIZE
        setRenderList(subCategoryList.slice(start, end))
    }
    const handleUpdateSubCategory = (
        subCategory: SubCategory,
        index: number
    ) => {
        modals.open({
            title: "Update subcategory",
            children: (
                <UpdateSubCategoryModal
                    subCategory={subCategory}
                    handlers={handlers}
                    index={index}
                    categoryId={categoryId}
                />
            ),
        })
    }
    const handleDeleteSubCategory = async (index: number) => {
        try {
            await instance.delete(
                `/subcategories/${categoryId}/${subCategoryList[index].id}`
            )
            handlers.remove(index)
            modals.closeAll()
            notifications.show({
                color: "teal",
                title: "Success",
                message: "Delete subcategory successfully",
            })
        } catch (error) {
            notifications.show({
                color: "red",
                title: "Error",
                message: getServerErrorNoti(error),
            })
        }
    }
    const handleDeleteSubCategoryModal = (index: number) => {
        modals.openConfirmModal({
            title: "Delete subcategory",
            children: "Are you sure you want to delete this subcategory?",
            labels: {
                confirm: "Delete",
                cancel: "Cancel",
            },
            onCancel: () => {},
            onConfirm: () => handleDeleteSubCategory(index),
        })
    }
    return (
        <>
            <Table verticalSpacing={"md"} highlightOnHover captionSide="top">
                <Table.Caption>Subcategory</Table.Caption>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Description</Table.Th>
                        <Table.Th>Created at</Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {renderList.map((subCategory, index) => (
                        <Table.Tr key={subCategory.id}>
                            <Table.Td>
                                <Text fw={500}>
                                    {PAGE_SIZE * (currentPage - 1) + 1 + index}
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text lineClamp={1}>{subCategory.name}</Text>
                            </Table.Td>
                            <Table.Td>
                                <Text lineClamp={1}>
                                    {subCategory.description}
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text lineClamp={1}>
                                    {convertDate(subCategory.createdAt)}
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Group gap={4}>
                                    <ActionIcon
                                        variant="default"
                                        onClick={() =>
                                            handleUpdateSubCategory(
                                                subCategory,
                                                index
                                            )
                                        }
                                    >
                                        <IconEdit size={"1rem"} stroke={1.5} />
                                    </ActionIcon>
                                    <ActionIcon
                                        variant="default"
                                        onClick={() =>
                                            handleDeleteSubCategoryModal(index)
                                        }
                                    >
                                        <IconTrash size={"1rem"} stroke={1.5} />
                                    </ActionIcon>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
            <CreateNewSubCategoryBtn
                categoryId={categoryId}
                currentPage={currentPage}
                handleChangePage={handleChangePage}
                handlers={handlers}
            />
            <Pagination
                total={Math.ceil(subCategories.length / PAGE_SIZE)}
                value={currentPage}
                onChange={handleChangePage}
            />
        </>
    )
}

export default SubCategoryTable

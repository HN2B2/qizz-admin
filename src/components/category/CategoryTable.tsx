import { CategoryDataContext, PAGE_SIZE } from "@/pages/category"
import { Category } from "@/types/category"
import { convertDate } from "@/utils"
import { ActionIcon, Drawer, Table, Text, Title } from "@mantine/core"
import { UseListStateHandlers, useDisclosure } from "@mantine/hooks"
import { IconEdit } from "@tabler/icons-react"
import { useRouter } from "next/router"
import { useContext } from "react"

const CategoryRow = ({
    index,
    category,
}: {
    index: number
    category: Category
}) => {
    const [opened, { open, close }] = useDisclosure(false)

    return (
        <>
            <Table.Tr>
                <Table.Td>
                    <Text fw={500}>{index}</Text>
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
                title={<Title order={3}>Manage category</Title>}
                position="right"
                size={"xl"}
            >
                {/* Drawer content */}
            </Drawer>
        </>
    )
}

const CategoryTable = () => {
    const {
        categoryList,
    }: {
        categoryList: Category[]
    } = useContext(CategoryDataContext)

    const router = useRouter()
    const { page = "1" } = router.query

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
                        index={
                            (parseInt(page as string) - 1) * PAGE_SIZE +
                            index +
                            1
                        }
                        category={category}
                        key={category.id + 1}
                    />
                ))}
            </Table.Tbody>
        </Table>
    )
}

export default CategoryTable

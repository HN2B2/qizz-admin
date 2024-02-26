export const runtime = "edge"

import {
    CategoryPagination,
    CategoryTable,
    CreateCategoryBtn,
    OrderCategory,
    SearchBar,
} from "@/components/category"
import SortCategory from "@/components/category/SortCategory"
import { BreadCrumbsItem, MainLayout } from "@/components/layouts"
import { Category } from "@/types/category"
import { instance } from "@/utils"
import { ActionIcon, Divider, Group, Paper } from "@mantine/core"
import { useListState } from "@mantine/hooks"
import { IconX } from "@tabler/icons-react"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"

export const PAGE_SIZE = 10

const breadcrumbsItems: BreadCrumbsItem[] = [
    { title: "Home", link: "/" },
    { title: "Category", link: "/category" },
]

interface CategoryResponse {
    data: Category[]
    total: number
}

interface CategoryPageProps {
    categoryData: CategoryResponse
}

export const CategoryDataContext = createContext<any>({} as any)

const CategoryPage = ({ categoryData }: CategoryPageProps) => {
    const [categoryList, handlers] = useListState(categoryData.data)
    const [total, setTotal] = useState(categoryData.total)

    const router = useRouter()
    const { page = "1", keyword, order, sort } = router.query

    const handleFetchCategoryData = async () => {
        try {
            const res = await instance.get(`/categories`, {
                params: {
                    limit: PAGE_SIZE,
                    page,
                    keyword,
                    order,
                    sort,
                },
            })
            const categoryData = res.data
            handlers.setState(categoryData.data)
            setTotal(categoryData.total)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetchCategoryData()
    }, [page, keyword, order, sort])

    const handleReset = () => {
        router.push({
            pathname: "/category",
        })
    }

    const totalPage = Math.ceil(total / PAGE_SIZE)
    return (
        <CategoryDataContext.Provider value={{ categoryList, handlers }}>
            <MainLayout title="Category" breadcrumbs={breadcrumbsItems}>
                <Paper p={"md"} my={"md"} shadow="sm">
                    <Group justify="space-between">
                        <SearchBar />
                        <Group>
                            <Group>
                                <OrderCategory />
                                <SortCategory />
                                <ActionIcon
                                    color="red"
                                    size={"lg"}
                                    onClick={handleReset}
                                >
                                    <IconX size={"1rem"} />
                                </ActionIcon>
                            </Group>
                            <Divider orientation="vertical" h={"100%"} />
                            <CreateCategoryBtn />
                        </Group>
                    </Group>
                </Paper>
                <Paper p={"md"} shadow="sm">
                    <CategoryTable />
                </Paper>
                <Group justify="center" my={"md"}>
                    <CategoryPagination total={totalPage} />
                </Group>
            </MainLayout>
        </CategoryDataContext.Provider>
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    try {
        const { req, query } = context
        const { page = "1", keyword, order, sort } = query

        const res = await instance.get(`/categories`, {
            params: {
                limit: PAGE_SIZE,
                page,
                keyword,
                order,
                sort,
            },
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie || "",
            },
        })
        const categoryData = res.data
        return {
            props: {
                categoryData,
            },
        }
    } catch (error) {
        console.log(error)
        return {
            notFound: true,
        }
    }
}
export default CategoryPage

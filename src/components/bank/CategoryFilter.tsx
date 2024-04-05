import React, { useEffect, useState } from "react"
import { Checkbox, Divider, ScrollArea, Title } from "@mantine/core"
import { useListState } from "@mantine/hooks"
import { Category } from "@/types/category"
import { instance } from "@/utils"
import { useRouter } from "next/router"
import { PAGE_SIZE } from "@/pages/bank"

interface CheckedState {
    [key: string]: boolean
}

interface Type {
    label: string
    checked: boolean
    key: number
}

const CategoryFilter = () => {
    const [checkedCategories, setCheckedCategories] = useState<CheckedState>({})
    const [checkedSubCategories, setCheckedSubCategories] =
        useState<CheckedState>({})
    const [categories, handlerCategories] = useListState<Category>([])
    const [list, listHandler] = useListState<number>([])
    const [checkedCat, setCheckedCat] = useListState<number>([])
    const [checkedSub, setCheckedSub] = useListState<number>([])
    const [values, handlers] = useListState<Type>()

    const allChecked = values.every((value) => value.checked)
    const indeterminate = values.some((value) => value.checked) && !allChecked
    const router = useRouter()
    const { keyword, order, sort, page, subCategoryIds } = router.query
    interface CategoryResponse {
        data: Category[]
        total: number
    }
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data: CategoryResponse = await instance
                    .get("categories?limit=100")
                    .json()

                handlerCategories.setState(data.data)
            } catch (error) {
                console.error("Error fetching categories:", error)
            }
        }
        fetchCategories()
    }, [])

    const handleCat = (value: number) => {
        if (checkedCat.includes(value)) {
            setCheckedCat.remove(checkedCat.indexOf(value))
            let newS = checkedSub.filter(
                (id) =>
                    !categories
                        .find((c) => c.id === value)
                        ?.subCategories.map((c) => c.id)
                        .includes(id)
            )
            setCheckedSub.setState(newS)
        } else {
            setCheckedCat.append(value)
            categories
                .find((category) => category.id === value)
                ?.subCategories.forEach((subCategory) => {
                    if (!checkedSub.includes(subCategory.id)) {
                        setCheckedSub.append(subCategory.id)
                    }
                })
        }
    }

    const handleSub = (value: number) => {
        if (checkedSub.includes(value)) {
            setCheckedSub.remove(checkedSub.indexOf(value))
        } else {
            setCheckedSub.append(value)
        }
    }

    useEffect(() => {
        router.push({
            pathname: "/bank",
            query: {
                limit: PAGE_SIZE,
                page,
                keyword,
                order,
                sort,
                subCategoryIds: checkedSub.join(","),
            },
        })
    }, [checkedSub])

    return (
        <>
            <Title size="md">Category</Title>
            <ScrollArea style={{ height: 200 }} w="100%">
                {categories.map((category, index) => (
                    <React.Fragment key={index}>
                        <Checkbox
                            label={category.name}
                            checked={checkedCat.includes(category.id) ?? false}
                            onChange={() => handleCat(category.id)}
                            labelPosition="right"
                            mb={5}
                        />
                        {category.subCategories.length > 0 && (
                            <>
                                {category.subCategories.map(
                                    (subCategory, subIndex) => (
                                        <Checkbox
                                            key={subIndex}
                                            label={subCategory.name}
                                            checked={
                                                checkedSub.includes(
                                                    subCategory.id
                                                ) ?? false
                                            }
                                            labelPosition="right"
                                            mb={5}
                                            ml="xs"
                                            onChange={() =>
                                                handleSub(subCategory.id)
                                            }
                                        />
                                    )
                                )}
                            </>
                        )}
                        <Divider mt="xs" mb="sm" color={"gray"} />
                    </React.Fragment>
                ))}
            </ScrollArea>
        </>
    )
}

export default CategoryFilter

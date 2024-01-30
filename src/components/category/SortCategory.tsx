import { ActionIcon, Select } from "@mantine/core"
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const SortCategory = () => {
    const [isDesc, setIsDesc] = useState(true)
    const router = useRouter()
    const { keyword, order, sort } = router.query
    useEffect(() => {
        if (router.isReady) {
            setIsDesc(sort === "desc")
        }
    }, [router.isReady])

    const handleToggleOrder = () => {
        setIsDesc((prev) => !prev)
        router.push({
            pathname: "/category",
            query: {
                keyword,
                order,
                sort: isDesc ? "desc" : "asc",
            },
        })
    }
    return (
        <ActionIcon size={"lg"} onClick={handleToggleOrder}>
            {isDesc ? (
                <IconSortDescending size={"1rem"} />
            ) : (
                <IconSortAscending size={"1rem"} />
            )}
        </ActionIcon>
    )
}

export default SortCategory

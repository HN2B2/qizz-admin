import { Pagination } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const CategoryPagination = ({ total }: { total: number }) => {
    const router = useRouter()
    const { keyword, order, sort, page } = router.query
    const [activePage, setPage] = useState(1)

    useEffect(() => {
        if (router.isReady) {
            setPage(Number(page) || 1)
        }
    }, [router.isReady, page])

    const handleChangePage = (value: number) => {
        setPage(value)
        router.push({
            pathname: "/category",
            query: {
                keyword,
                order,
                sort,
                page: value,
            },
        })
    }
    return (
        <Pagination
            total={total}
            value={activePage}
            onChange={handleChangePage}
        />
    )
}

export default CategoryPagination

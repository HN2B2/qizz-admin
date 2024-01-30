import { Select } from "@mantine/core"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const orderData = [
    { value: "id", label: "Default" },
    { value: "name", label: "Name" },
    { value: "createdAt", label: "Created at" },
]

const OrderCategory = () => {
    const router = useRouter()
    const { order, keyword } = router.query
    const [orderValue, setOrderValue] = useState<string | null>("id")

    useEffect(() => {
        if (router.isReady) {
            setOrderValue((order as string) || "id")
        }
    }, [router.isReady, keyword])

    const handleChangeOrder = (value: string | null) => {
        setOrderValue(value)
        router.push({
            pathname: "/category",
            query: {
                keyword,
                order: value,
            },
        })
    }

    return (
        <Select
            placeholder="Sort by"
            data={orderData}
            value={orderValue}
            onChange={handleChangeOrder}
        />
    )
}

export default OrderCategory

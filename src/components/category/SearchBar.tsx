import { ActionIcon, Group, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const SearchBar = () => {
    const router = useRouter()
    const { keyword } = router.query
    const [keywordValue, setKeywordValue] = useState(keyword || "")

    useEffect(() => {
        if (router.isReady && keyword !== keywordValue) {
            setKeywordValue(keyword ? (keyword as string) : "")
        }
    }, [router.isReady, keyword])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (keywordValue) {
            router.push({
                pathname: "/category",
                query: {
                    keyword: keywordValue,
                },
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Group>
                <TextInput
                    placeholder="Search category"
                    name="keyword"
                    w={"400px"}
                    value={keywordValue}
                    onChange={(e) => setKeywordValue(e.target.value)}
                />
                <ActionIcon h={"100%"} size={"lg"} type="submit">
                    <IconSearch size={"1rem"} stroke={1.5} />
                </ActionIcon>
            </Group>
        </form>
    )
}

export default SearchBar

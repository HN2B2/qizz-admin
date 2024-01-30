import { ActionIcon, Group, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const SearchBar = () => {
    const router = useRouter()
    const { keyword } = router.query

    const [keywordValue, setKeywordValue] = useState("")

    useEffect(() => {
        if (router.isReady) {
            setKeywordValue(keyword as string)
        }
    }, [router.isReady])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push({
            pathname: "/category",
            query: { keyword: keywordValue },
        })
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
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

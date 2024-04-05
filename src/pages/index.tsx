import { BreadCrumbsItem, MainLayout } from "@/components/layouts"
import {
    Badge,
    Grid,
    Group,
    Paper,
    rem,
    ScrollArea,
    Skeleton,
    Stack,
    Table,
    ThemeIcon,
    Title,
} from "@mantine/core"
import { useEffect, useState } from "react"
import {
    IconPuzzle,
    IconQuestionMark,
    IconDeviceGamepad2,
    IconUser,
} from "@tabler/icons-react"
import { getChartData, instance } from "@/utils"
import { ListResponse } from "@/types/ListResponse"
import { Bank } from "@/types/bank"
import { GetAllUserResponse } from "@/types/users"
import { AreaChart } from "@mantine/charts"
import { UserResponse } from "@/types/user"

const getBannedBadge = (banned: boolean) => {
    return (
        <Badge variant="outline" color={banned === true ? "red" : "teal"}>
            {banned === true ? "True" : "False"}
        </Badge>
    )
}

const PreviewUserTable = ({
    userData,
}: {
    userData: UserResponse[] | undefined
}) => {
    return (
        <ScrollArea h={300} offsetScrollbars scrollbarSize={6}>
            <Table verticalSpacing="sm" highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>User</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Banned</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {userData
                        ? userData.map((user, i) => (
                              <Table.Tr key={user.id}>
                                  <Table.Td>{i + 1}</Table.Td>
                                  <Table.Td>{user.username}</Table.Td>
                                  <Table.Td>{user.email}</Table.Td>
                                  <Table.Td>
                                      {getBannedBadge(user.banned)}
                                  </Table.Td>
                              </Table.Tr>
                          ))
                        : [...Array(4)].map((_, i) => (
                              <Table.Tr key={i}>
                                  <Table.Td colSpan={4}>
                                      <Skeleton height={40} w="100%" />
                                  </Table.Td>
                              </Table.Tr>
                          ))}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    )
}

export default function Home() {
    const [totalBank, setTotalBank] = useState<ListResponse<Bank>>()
    const [totalQuestion, setTotalQuestion] = useState(0)
    const [totalQuiz, setTotalQuiz] = useState(0)
    const [totalUser, setTotalUser] = useState<GetAllUserResponse>()

    const handleFetchData = async () => {
        try {
            const res1: ListResponse<Bank> = await instance
                .get("bank/all?limit=100")
                .json()
            setTotalBank(res1)

            const res2: GetAllUserResponse = await instance
                .get("users?limit=1000")
                .json()
            setTotalUser(res2)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetchData()
    }, [])
    const breadcrumbsItems: BreadCrumbsItem[] = [
        { title: "Quiz Admin", link: "/" },
    ]

    return (
        <MainLayout breadcrumbs={breadcrumbsItems}>
            <Grid columns={4} my={20}>
                <Grid.Col span={1}>
                    <Paper p={20} shadow="md">
                        <Group>
                            <ThemeIcon
                                radius="50%"
                                color="green"
                                p=""
                                size={60}
                            >
                                <IconPuzzle color="white" size={30} />
                            </ThemeIcon>
                            <Stack justify="center" gap={0}>
                                <Title order={3}>Total bank:</Title>
                                <Title order={1}>{totalBank?.total || 0}</Title>
                            </Stack>
                        </Group>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Paper p={20} shadow="md">
                        <Group>
                            <ThemeIcon radius="50%" color="red" p="" size={60}>
                                <IconQuestionMark color="white" size={30} />
                            </ThemeIcon>
                            <Stack justify="center" gap={14}>
                                <Title order={3}>Total question:</Title>
                                <Skeleton width={20} height={30} />
                            </Stack>
                        </Group>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Paper p={20} shadow="md">
                        <Group>
                            <ThemeIcon
                                radius="50%"
                                color="yellow"
                                p=""
                                size={60}
                            >
                                <IconDeviceGamepad2 size={30} />
                            </ThemeIcon>
                            <Stack justify="center" gap={14}>
                                <Title order={3}>Total quiz:</Title>
                                {/* <Title order={1}>{totalQuiz}</Title> */}
                                <Skeleton width={20} height={30} />
                            </Stack>
                        </Group>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Paper p={20} shadow="md">
                        <Group>
                            <ThemeIcon radius="50%" p="" size={60}>
                                <IconUser color="white" size={30} />
                            </ThemeIcon>
                            <Stack justify="center" gap={0}>
                                <Title order={3}>Total user:</Title>
                                <Title order={1}>{totalUser?.total || 0}</Title>
                            </Stack>
                        </Group>
                    </Paper>
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={7}>
                    <Paper p={20} shadow="md">
                        <Title order={3} mb={12}>
                            Bank Created
                        </Title>
                        {totalBank ? (
                            <AreaChart
                                h={300}
                                data={getChartData(totalBank)}
                                dataKey="date"
                                series={[
                                    {
                                        name: "totalBank",
                                        label: "Bank created",
                                        color: "indigo.6",
                                    },
                                ]}
                                curveType="linear"
                            />
                        ) : (
                            <Skeleton height={300} />
                        )}
                    </Paper>
                </Grid.Col>
                <Grid.Col span={5}>
                    <Paper p={20} shadow="md">
                        <Title order={3} mb={12}>
                            Total User
                        </Title>
                        <PreviewUserTable userData={totalUser?.data} />
                    </Paper>
                </Grid.Col>
            </Grid>
        </MainLayout>
    )
}

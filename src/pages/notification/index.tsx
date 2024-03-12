import { BreadCrumbsItem, MainLayout } from "@/components/layouts";
import { CreateNotificationBtn, NotificationSearch, NotificationTable } from "@/components/manageNotification";
import GetAllNotificationsResponse from "@/types/notification/GetAllNotificationsResponse";
import { instance } from "@/utils";
import { Container, Flex, Group, Paper, ScrollArea } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { createContext, useEffect } from "react"

interface NotificationPageProps {
    notificationData : GetAllNotificationsResponse
}
export const NotificationDataContext = createContext<any>([] as any)
const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Home", link: "/" },
  { title: "Notification", link: "/notification" },
];
const PAGE: number = 1
export const PAGE_SIZE: number = 5
const NotificationPage = ({ notificationData }: NotificationPageProps) => {
    const router = useRouter()
    const { page = 1, keyword, order, sort, target } = router.query
    const [notifications, handlers] = useListState(notificationData.data)

    const totalPage = Math.ceil(notificationData.total / PAGE_SIZE)

    const fetchNotifications = async () => {
        try {
            let fetchPage = parseInt(page as string)
            if (!page || fetchPage < 1) {
                fetchPage = 1
            }
            if (fetchPage > totalPage) {
                fetchPage = totalPage
            }
            if (fetchPage < 1) {
                fetchPage = 1
            }

            const { data: newData } = await instance.get(`/notifications`, {
                params: {
                    limit: PAGE_SIZE,
                    page: fetchPage,
                    keyword: keyword,
                    order: order,
                    sort: sort,
                    target: target,
                },
            })

            handlers.setState(newData.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [keyword, page, order, sort, target])
  return (
    <NotificationDataContext.Provider value={{notifications, handlers}}>
        <MainLayout title="Notification" breadcrumbs={breadcrumbsItems}>
       <ScrollArea>
                    <Container size={"xl"} mt={"md"}>
                        <Paper p={"md"} shadow="sm" my={"md"}>
                            <Flex
                                justify="space-between"
                                gap="lg"
                                px={"md"}
                                mt={"md"}
                            >
                                <NotificationSearch/>
                                <Group mb="md">
                                    <CreateNotificationBtn/>
                                </Group>
                            </Flex>
                            
                        </Paper>
                        <Paper p={"md"} shadow="sm">
                            <NotificationTable/>
                        </Paper>

                        <Paper p={"md"} shadow="sm">
                            <Group justify="center">
                                
                            </Group>
                        </Paper>
                    </Container>
                </ScrollArea>
    </MainLayout>
    </NotificationDataContext.Provider>
    
  );
};

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    try {
        const { req, query } = context
        const { page = PAGE, keyword, order, sort, target } = query
        const res = await instance.get(`/notifications`, {
            params: {
                limit: PAGE_SIZE,
                page,
                keyword,
                order,
                sort,
                target
            },
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie || "",
            },
        })
        const notificationData = res.data
        return {
            props: {
                notificationData,
            },
        }
    } catch (error) {
        console.log(error)
        return {
            notFound: true,
        }
    }
}

export default NotificationPage;

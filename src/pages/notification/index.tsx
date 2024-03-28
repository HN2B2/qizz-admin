export const runtime = "experimental-edge";

import { BreadCrumbsItem, MainLayout } from "@/components/layouts";
import {
  CreateNotificationBtn,
  NotificationPagination,
  NotificationSearch,
  NotificationTable,
} from "@/components/manageNotification";
import { Exception } from "@/types/exception";
import { NotificationResponse } from "@/types/notification";
import GetAllNotificationsResponse from "@/types/notification/GetAllNotificationsResponse";
import { instance, removeEmpty } from "@/utils";
import { Container, Flex, Group, Paper, ScrollArea } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { createContext, useEffect } from "react";

interface NotificationPageProps {
  notificationData: GetAllNotificationsResponse;
}
export const NotificationDataContext = createContext<any>([] as any);
const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Home", link: "/" },
  { title: "Notification", link: "/notification" },
];

const PAGE: number = 1;
export const PAGE_SIZE: number = 5;
const NotificationPage = ({ notificationData }: NotificationPageProps) => {
  const router = useRouter();
  const { page = 1, keyword, order, sort, target } = router.query;
  const [notifications, handlers] = useListState(notificationData.data);

  const totalPage = Math.ceil(notificationData.total / PAGE_SIZE);

  const fetchNotifications = async () => {
    try {
      let fetchPage = parseInt(page as string);
      if (!page || fetchPage < 1) {
        fetchPage = 1;
      }
      if (fetchPage > totalPage) {
        fetchPage = totalPage;
      }
      if (fetchPage < 1) {
        fetchPage = 1;
      }

      const dataNoti: GetAllNotificationsResponse = await instance
        .get(`notifications`, {
          searchParams: removeEmpty({
            limit: PAGE_SIZE.toString(),
            page: fetchPage.toString(),
            keyword: keyword as string,
            order: order as string,
            sort: sort as string,
            target: target as string,
          }),
        })
        .json();

      handlers.setState(dataNoti.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [keyword, page, order, sort, target]);
  return (
    <NotificationDataContext.Provider value={{ notifications, handlers }}>
      <MainLayout title="Notification" breadcrumbs={breadcrumbsItems}>
        <ScrollArea>
          <Container size={"xl"} mt={"md"}>
            <Paper p={"md"} shadow="sm" my={"md"}>
              <Flex justify="space-between" gap="lg" px={"md"} mt={"md"}>
                <NotificationSearch />
                <Group mb="md">
                  <CreateNotificationBtn />
                </Group>
              </Flex>
            </Paper>
            <Paper p={"md"} shadow="sm">
              <NotificationTable />
            </Paper>

            <Paper p={"md"} shadow="sm">
              <Group justify="center">
                <NotificationPagination
                  total={notificationData.total}
                  pageSize={PAGE_SIZE}
                />
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
    const { req, query } = context;
    const { page = PAGE, keyword, order, sort, target } = query;

    const res: GetAllNotificationsResponse = await instance
      .get(`notifications`, {
        searchParams: removeEmpty({
          limit: PAGE_SIZE.toString(),
          page: page.toString(),
          keyword: keyword as string,
          order: order as string,
          sort: sort as string,
          target: target as string,
        }),
        headers: {
          Cookie: req.headers.cookie || "",
        },
      })
      .json();
    return {
      props: {
        notificationData: res,
      },
    };
  } catch (error) {
    const { response }: any = error;
    if (response) {
      const data: Exception = await response.json();
      console.log(data.message);
    }
    return {
      notFound: true,
    };
  }
};

export default NotificationPage;

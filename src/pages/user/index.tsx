export const runtime = "experimental-edge";
import React, { createContext } from "react";
import { useEffect } from "react";
import { Container } from "@mantine/core";
import { Flex, Paper } from "@mantine/core";
import { ScrollArea, Group } from "@mantine/core";
import GetAllUSerResponse from "@/types/users/GetAllUserResponse";
import { instance, removeEmpty } from "@/utils";
import { BreadCrumbsItem, MainLayout } from "@/components/layouts";
import { GetServerSidePropsContext } from "next";
import UserTable from "../../components/manageUser/UserTable";

import {
  CreateUserBtn,
  UserPagination,
  UserSearchName,
  UserSort,
} from "@/components/manageUser";
import { useRouter } from "next/router";
import { useListState } from "@mantine/hooks";
import UserFilter from "@/components/manageUser/UserFilter";
import { Exception } from "@/types/exception";

export const PAGE_SIZE: number = 5;
const PAGE: number = 1;

const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Quiz Admin", link: "./" },
  { title: "User", link: "./user" },
];

interface UserPageProps {
  userData: GetAllUSerResponse;
}

export const UserDataContext = createContext<any>([] as any);

const UserPage = ({ userData }: UserPageProps) => {
  const router = useRouter();
  const { page = 1, keyword, order, sort, role, banned } = router.query;
  const [users, handlers] = useListState(userData.data);

  const totalPage = Math.ceil(userData.total / PAGE_SIZE);

  const fetchUsers = async () => {
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

      const data: GetAllUSerResponse = await instance
        .get(`users`, {
          searchParams: removeEmpty({
            limit: PAGE_SIZE.toString(),
            page: fetchPage.toString(),
            keyword: keyword as string,
            order: order as string,
            sort: sort as string,
            role: role as string,
            banned: banned as string,
          }),
        })
        .json();

      handlers.setState(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [keyword, page, order, sort, role, banned]);

  return (
    <UserDataContext.Provider value={{ users, handlers }}>
      <MainLayout title="User" breadcrumbs={breadcrumbsItems}>
        <ScrollArea>
          <Container size={"xl"} mt={"md"}>
            <Paper p={"md"} shadow="sm" my={"md"}>
              <Flex justify="space-between" gap="lg" px={"md"} mt={"md"}>
                <UserSearchName />
                <Group mb="md">
                  <UserSort />
                  <CreateUserBtn />
                </Group>
              </Flex>
              <UserFilter total={userData.total} />
            </Paper>
            <Paper p={"md"} shadow="sm">
              <UserTable />
            </Paper>

            <Paper p={"md"} shadow="sm">
              <Group justify="center">
                <UserPagination total={userData.total} pageSize={PAGE_SIZE} />
              </Group>
            </Paper>
          </Container>
        </ScrollArea>
      </MainLayout>
    </UserDataContext.Provider>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { req, query } = context;
    const { page = PAGE, keyword, order, sort, role, banned } = query;
    const res: GetAllUSerResponse = await instance
      .get(`users`, {
        searchParams: removeEmpty({
          limit: PAGE_SIZE.toString(),
          page: page.toString(),
          keyword: keyword as string,
          order: order as string,
          sort: sort as string,
          role: role as string,
          banned: banned as string,
        }),
        headers: {
          Cookie: req.headers.cookie || "",
        },
      })
      .json();
    return {
      props: {
        userData: res,
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

export default UserPage;

import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useEffect, useState } from "react";
import { ActionIcon, Box, Container, Pagination } from "@mantine/core";
import { Button, Flex, Paper } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { ScrollArea, Group, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import GetAllUSerResponse from "@/types/users/GetAllUserResponse";
import { instance } from "@/utils";
import { BreadCrumbsItem, MainLayout } from "@/components/layouts";
import { GetServerSidePropsContext } from "next";
import UserTable from "../../components/manageUser/UserTable";
import {
  CreateModal,
  UserPagination,
  UserSearchName,
} from "@/components/manageUser";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";

const PAGE_SIZE: number = 5;
const PAGE: number = 1;

const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Quiz Admin", link: "./" },
  { title: "User", link: "./user" },
];

interface UserPageProps {
  userData: GetAllUSerResponse;
}

const UserPage = ({ userData }: UserPageProps) => {
  const router = useRouter();
  const { page, keyword } = router.query;
  const [users, setUsers] = useState(userData.data);
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
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
      const { data: newData } = await instance.get(
        `/users?limit=${PAGE_SIZE}
        ${page ? `&page=${fetchPage}` : ""}
        ${keyword ? `&keyword=${keyword}` : ""}`
      );
      setUsers(newData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [keyword, page]);

  return (
    <MainLayout title="User" breadcrumbs={breadcrumbsItems}>
      <ScrollArea>
        <Container size={"xl"} mt={"md"}>
          <Paper
            shadow="md"
            style={{ marginBottom: "20px", marginTop: "10px" }}
          >
            <Flex justify="space-between" gap="lg" px={"md"} mt={"md"}>
              <UserSearchName />

              {/* create user */}
              <Group mb="md">
                <Button onClick={() => setShowModalCreate(true)}>
                  Add User
                </Button>
                <CreateModal
                  showModalCreate={showModalCreate}
                  setShowModalCreate={setShowModalCreate}
                />
              </Group>
              {/* create user */}
            </Flex>
          </Paper>

          <UserTable users={users} setUsers={setUsers} />

          <Group justify="center">
            <UserPagination total={userData.total} pageSize={PAGE_SIZE} />
          </Group>
        </Container>
      </ScrollArea>
    </MainLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { req, query } = context;
    const { page = PAGE, keyword } = query;
    const res = await instance.get(
      `/users?limit=${PAGE_SIZE}&page=${page}${
        keyword ? `&keyword=${keyword}` : ""
      }`,
      {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie || "",
        },
      }
    );
    const userData = res.data;
    return {
      props: {
        userData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default UserPage;

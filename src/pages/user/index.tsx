import React, { createContext, useContext, useMemo } from "react";
import { useEffect, useState } from "react";
import { Box, Container, Pagination } from "@mantine/core";
import { Button, Flex, Paper } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { ScrollArea, Group, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import GetAllUSerResponse from "@/types/users/GetAllUserResponse";
import { instance } from "@/utils";
import { BreadCrumbsItem, MainLayout } from "@/components/layouts";
import { GetServerSidePropsContext } from "next";
import UserTable from "../../components/manageUser/UserTable";
import { CreateModal } from "@/components/manageUser";

const PAGE_SIZE = 5;

const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Quiz Admin", link: "./" },
  { title: "User", link: "./user" },
];

interface UserPageProps {
  userData: GetAllUSerResponse;
}

const UserPage = ({ userData }: UserPageProps) => {
  const [users, setUsers] = useState(userData.data);

  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);

  return (
    <MainLayout title="User" breadcrumbs={breadcrumbsItems}>
      <ScrollArea>
        <Container size={"xl"} mt={"md"}>
          <Paper
            shadow="md"
            style={{ marginBottom: "20px", marginTop: "10px" }}
          >
            <Flex justify="space-between" gap="lg" px={"md"} mt={"md"}>
              <TextInput
                placeholder="Search"
                size="xs"
                w={600}
                leftSection={
                  <IconSearch
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                }
                rightSectionWidth={70}
                styles={{ section: { pointerEvents: "none" } }}
                mb="md"
              />
              <Group mb="md">
                <Button
                  onClick={() =>
                    console.log(">>>Check url", window.location.search)
                  }
                >
                  Check url
                </Button>
                <Button onClick={() => setShowModalCreate(true)}>
                  Add User
                </Button>
                <CreateModal
                  showModalCreate={showModalCreate}
                  setShowModalCreate={setShowModalCreate}
                />
              </Group>
            </Flex>
          </Paper>
          <UserTable users={users} setUsers={setUsers} />
          <Group justify="center">
            <Pagination total={Math.ceil(userData.total / PAGE_SIZE)} mt={12} />
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
    const { page = 1, keyword } = query;
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

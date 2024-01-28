import React, { createContext, useCallback, useContext, useMemo } from "react";
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
import { useRouter } from "next/router";
import { getHotkeyHandler, usePagination, useSetState } from "@mantine/hooks";

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
  const handlePage = (value: string) => {
    // window.history.pushState(null, "", `/user?page=${page}`);
    router.query.page = value.toString();
    router.push(router);
    router.reload;
    console.log("Check value", value);
  };
  const [page, setPage] = useState(PAGE);
  const [users, setUsers] = useState(userData.data);
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const router = useRouter();

  const pagination = usePagination({
    total: userData.total,
    initialPage: PAGE,
  });
  // const [activePage, setPage] = useState<number>(PAGE);

  const [keyword, setKeyword] = useState<string>("");
  const handdleSearch = () => {
    if (!keyword) {
      router.push(`/user`);
    } else {
      router.query.keyword = keyword;
      router.push(router);
    }
  };
  console.log(">>> check Page", page);
  const refreshData = () => {};

  useEffect(() => {
    router.push(`/user?page=${page}`);
  }, [page]);

  const handlePage2 = () => {
    console.log(">>> check Page2", page);
  };

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
                value={keyword}
                onChange={(e) => setKeyword(e.currentTarget.value)}
                onKeyUp={handdleSearch}
                onKeyDown={getHotkeyHandler([["Enter", router.reload]])}
              />

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
            <Pagination
              total={Math.ceil(userData.total / PAGE_SIZE)}
              value={page}
              onChange={setPage}
              mt={12}
              onClick={handlePage2}
              // onClick={() => {
              //   handlePage();
              // }}
            />
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

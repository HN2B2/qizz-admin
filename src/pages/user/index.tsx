import React from "react";
import { useEffect, useState } from "react";
import { Container } from "@mantine/core";
import { Button, Flex, Paper } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { ScrollArea, Group, rem } from "@mantine/core";

import { IconSearch } from "@tabler/icons-react";

import GetAllUSerResponse from "@/types/users/GetAllUserResponse";
import { instance } from "@/utils";
import CreateModal from "../../components/manageUser/createModal";
import AppTable from "../../components/manageUser/table";
import { BreadCrumbsItem, MainLayout } from "@/components/layouts";
const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Quiz Admin", link: "./" },
  { title: "User", link: "./user" },
];

const UserPage = (props: GetAllUSerResponse) => {
  const [users, setUsers] = useState<GetAllUSerResponse>({
    data: [],
    total: 0,
  });

  const fetchDataUsers = async () => {
    const res = await instance.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchDataUsers();
  });

  const demoProps = {
    mt: "md",
  };

  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);

  return (
    <MainLayout title="User" breadcrumbs={breadcrumbsItems}>
      <ScrollArea>
        <Container size={"xl"} {...demoProps}>
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
          <AppTable />
        </Container>
      </ScrollArea>
    </MainLayout>
  );
};

export default UserPage;

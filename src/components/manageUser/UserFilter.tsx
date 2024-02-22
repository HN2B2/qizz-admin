import {
  ActionIcon,
  Badge,
  Button,
  Collapse,
  Flex,
  Group,
  Select,
  Tooltip,
} from "@mantine/core";
import { UseListStateHandlers, useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaUserCog } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa";
import { TbFilterSearch } from "react-icons/tb";
import { TbFilterX } from "react-icons/tb";
import { UserResponse } from "@/types/user";
import { UserDataContext } from "@/pages/user";
interface Query {
  [key: string]: string | string[] | undefined;
  keyword?: string | string[];
  order?: string;
  sort?: string;
  role?: string | string[];
  banned?: string | string[];
}
const UserFilter = ({ total }: { total: number }) => {
  const {
    users,
    handlers,
  }: {
    users: UserResponse[];
    handlers: UseListStateHandlers<UserResponse>;
  } = useContext(UserDataContext);
  const router = useRouter();
  const { keyword, role, banned, sort, order } = router.query;
  const [clicked, setClicked] = useState(false);
  const [filterRole, setFilterRole] = useState<string | null>("");
  const [filterBanned, setFilterBanned] = useState<string | null>("");
  useEffect(() => {
    if (router.isReady) {
      setFilterRole((role as string) || "");
      setFilterBanned((banned as string) || "");
    }
  }, [router.isReady]);

  const handleFilter = () => {
    if (!filterRole && !filterBanned) {
      router.push({
        query: keyword ? { keyword } : {},
      });
      return;
    }
    const queryy: Query = {};
    if (keyword) {
      queryy.keyword = keyword;
    }
    if (filterRole) {
      queryy.role = filterRole;
    }
    if (filterBanned) {
      queryy.banned = filterBanned;
    }
    router.push({
      query: queryy,
    });
  };
  const handlerClearFilter = () => {
    setFilterRole(null);
    setFilterBanned(null);
    router.push({
      query: {},
    });
  };
  const handleButtonFilter = () => {
    toggle();
    setClicked(!clicked);
  };
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <>
      <Group justify="space-between">
        <Badge ml="md" variant="light" color="blue" size="lg" radius="sm">
          Total results: {total}
        </Badge>
        <Button
          mr="md"
          size="xs"
          variant="filled"
          color="blue"
          leftSection={<IoFilterSharp size={"1rem"} />}
          rightSection={
            clicked ? (
              <IoIosArrowUp size={"1rem"} />
            ) : (
              <IoIosArrowDown size={"1rem"} />
            )
          }
          onClick={() => handleButtonFilter()}
        >
          Advanced Filters
        </Button>
      </Group>

      <Collapse in={opened}>
        <Flex>
          <Group w="90%" justify="space-between" mt="md" grow wrap="nowrap">
            <Select
              leftSection={<FaUserCog size={"1rem"} />}
              leftSectionPointerEvents="none"
              placeholder="Filter by role"
              value={filterRole}
              onChange={setFilterRole}
              ml={"md"}
              data={["USER", "STAFF", "ADMIN"]}
              clearable
            />
            <Select
              leftSection={<FaUserLock size={"1rem"} />}
              leftSectionPointerEvents="none"
              mr="md"
              placeholder="Filter by banned"
              data={["True", "False"]}
              value={filterBanned}
              onChange={setFilterBanned}
              clearable
            />
          </Group>
          <Tooltip label="Search filter">
            <ActionIcon mt="md" size="lg" onClick={handleFilter}>
              <TbFilterSearch></TbFilterSearch>
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Clear filter">
            <ActionIcon
              onClick={() => handlerClearFilter()}
              mt="md"
              color="red"
              ml="10px"
              mr="md"
              size="lg"
            >
              <TbFilterX></TbFilterX>
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Collapse>
    </>
  );
};
export default UserFilter;

import { ActionIcon, Group, TextInput, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
interface Query {
  [key: string]: string | string[] | undefined;
  keyword?: string | string[];
  order?: string;
  sort?: string;
  role?: string | string[];
  banned?: string | string[];
}
const UserSearchName = () => {
  const router = useRouter();
  const { keyword, role, banned } = router.query;
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setSearchKeyword((keyword as string) || "");
    }
  }, [router.isReady]);

  const handdleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchKeyword || searchKeyword.length === 0) {
      router.push({
        query: {},
      });
      return;
    }
    const queryy: Query = {};
    if (role) {
      queryy.role = role;
    }
    if (banned) {
      queryy.banned = banned;
    }
    queryy.keyword = searchKeyword;
    router.push({
      query: queryy,
    });
  };

  return (
    <form onClick={handdleSearch}>
      <Group gap="3px" wrap="nowrap">
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
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.currentTarget.value)}
        />
        <ActionIcon mb={"md"} type="submit">
          <CiSearch />
        </ActionIcon>
      </Group>
    </form>
  );
};
export default UserSearchName;

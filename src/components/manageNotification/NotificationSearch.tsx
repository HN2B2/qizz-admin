import { ActionIcon, Group, TextInput, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

interface Query {
  [key: string]: string | string[] | undefined;
  keyword?: string | string[];
  order?: string;
  sort?: string;
  target?: string | string[];
}
const NotificationSearch = () => {
  const router = useRouter();
  const { keyword, target } = router.query;
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setSearchKeyword((keyword as string) || "");
    }
  }, [router.isReady]);
  const handdleSearch = () => {
    if (!searchKeyword || searchKeyword.length === 0) {
      router.push({
        query: {},
      });
      return;
    }
    const queryy: Query = {};
    if (target) {
      queryy.target = target;
    }
    queryy.keyword = searchKeyword;
    router.push({
      query: queryy,
    });
  };
  return (
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
      <ActionIcon mb={"md"} onClick={handdleSearch}>
        <CiSearch />
      </ActionIcon>
    </Group>
  );
};
export default NotificationSearch;

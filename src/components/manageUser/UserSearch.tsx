import { ActionIcon, Group, TextInput, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const UserSearch = ({
  total,
  pageSize,
}: {
  total: number;
  pageSize: number;
}) => {
  const router = useRouter();
  const { keyword } = router.query;
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    if (router.isReady) {
      setSearchKeyword(keyword as string);
    }
  }, [router.isReady, keyword]);

  const handdleSearch = () => {
    if (!searchKeyword || searchKeyword.length === 0) {
      router.push({
        query: {},
      });
      return;
    }
    router.push({
      query: {
        keyword: searchKeyword,
      },
    });
  };

  return (
    <Group gap="xs">
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
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <ActionIcon mb={"md"} onClick={handdleSearch}>
        <CiSearch />
      </ActionIcon>
    </Group>
  );
};
export default UserSearch;

import {
  ActionIcon,
  Combobox,
  Group,
  Input,
  InputBase,
  NativeSelect,
  useCombobox,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconSortDescending } from "@tabler/icons-react";
const UserSort = () => {
  const sortData = ["asc", "desc"];
  const router = useRouter();
  const { sort } = router.query;
  const [sortValue, setSortValue] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      if (sort && sort.length > 0) {
        setSortValue(sort as string);
      }
    }
  }, [router.isReady]);

  const handleSort = () => {
    if (!sortValue || sortValue.length === 0) {
      router.push({
        query: {},
      });
      return;
    }
    router.push({
      query: {
        sort: sortValue,
      },
    });
  };

  return (
    <>
      <Group>
        <NativeSelect
          value={sortValue || "asc"}
          onChange={(event) => setSortValue(event.currentTarget.value)}
          data={sortData}
        />
        <ActionIcon onClick={handleSort}>
          <IconSortDescending />
        </ActionIcon>
      </Group>
    </>
  );
};
export default UserSort;

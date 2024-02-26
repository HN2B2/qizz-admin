import { ActionIcon, Group, NativeSelect } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconSortDescending } from "@tabler/icons-react";
import { IconSortAscending } from "@tabler/icons-react";

interface Query {
  [key: string]: string | string[] | undefined;
  keyword?: string | string[];
  order?: string;
  sort?: string;
  role?: string | string[];
  banned?: string | string[];
}
const UserSort = () => {
  const orderData = ["id", "username", "email", "role", "banned"];
  const router = useRouter();
  const { order, keyword, role, banned } = router.query;
  const [clicked, setClicked] = useState(false);
  const [isDesc, setIsDesc] = useState(true);

  const [oderValue, setOrderValue] = useState<string | null>("id");
  useEffect(() => {
    if (router.isReady) {
      if (order && order.length > 0) {
        setOrderValue(order as string);
      }
    }
  }, [router.isReady]);

  const handleOrder = () => {
    setClicked(!clicked);
    setIsDesc((prev) => !prev);
    const queryy: Query = {};
    if (keyword) {
      queryy.keyword = keyword;
    }
    if (role) {
      queryy.role = role;
    }
    if (banned) {
      queryy.banned = banned;
    }
    if (oderValue) {
      queryy.order = oderValue;
    }
      queryy.sort = isDesc ? "desc" : "asc";
    
    router.push({
      query: queryy,
    });

  };

  return (
    <Group gap="3px">
      <NativeSelect
        size="xs"
        value={oderValue || "id"}
        onChange={(event) => setOrderValue(event.currentTarget.value)}
        data={orderData}
      />
      <ActionIcon onClick={handleOrder}>
        {isDesc ? (
          <IconSortAscending size={"1rem"} />
        ) : (
          <IconSortDescending size={"1rem"} />
        )}
      </ActionIcon>
    </Group>
  );
};
export default UserSort;

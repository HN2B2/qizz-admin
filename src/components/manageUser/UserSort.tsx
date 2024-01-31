import { ActionIcon, Group, NativeSelect } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconSortDescending } from "@tabler/icons-react";
import { IconSortAscending } from "@tabler/icons-react";
const UserSort = () => {
  const orderData = ["id", "username", "email", "role", "banned"];
  const router = useRouter();
  const { order, keyword } = router.query;
  const [clicked, setClicked] = useState(false);

  const [oderValue, setOrderValue] = useState<string | null>("id");
  useEffect(() => {
    if (router.isReady) {
      if (order && order.length > 0) {
        setOrderValue(order as string);
      }
    }
  }, [router.isReady]);

  const handleOrderDesc = () => {
    setClicked(!clicked);
    if (!oderValue || oderValue.length === 0) {
      router.push({
        query: {},
      });
      return;
    }
    router.push({
      query: {
        keyword,
        order: oderValue,
        sort: "desc",
      },
    });
  };

  const handleOrderAsc = () => {
    setClicked(!clicked);
    if (!oderValue || oderValue.length === 0) {
      router.push({
        query: {},
      });
      return;
    }
    router.push({
      query: {
        keyword,
        order: oderValue,
        sort: "asc",
      },
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

      {clicked ? (
        <ActionIcon onClick={handleOrderAsc}>
          <IconSortAscending size={"1rem"} />
        </ActionIcon>
      ) : (
        <ActionIcon onClick={handleOrderDesc}>
          <IconSortDescending size={"1rem"} />
        </ActionIcon>
      )}
    </Group>
  );
};
export default UserSort;

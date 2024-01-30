import {
  ActionIcon,
  Button,
  Combobox,
  Group,
  Input,
  InputBase,
  NativeSelect,
  useCombobox,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdOutlineSort } from "react-icons/md";
import { IconSortDescending } from "@tabler/icons-react";
import { IconSortAscending } from "@tabler/icons-react";
const UserOrder = () => {
  const orderData = ["id", "username", "email", "role", "banned"];
  const router = useRouter();
  const { order } = router.query;
  const [clicked, setClicked] = useState(false);

  const [oderValue, setOrderValue] = useState<string | null>(null);
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
          <IconSortAscending />
        </ActionIcon>
      ) : (
        <ActionIcon onClick={handleOrderDesc}>
          <IconSortDescending />
        </ActionIcon>
      )}
    </Group>
  );
};
export default UserOrder;

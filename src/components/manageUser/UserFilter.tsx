import { ActionIcon, Group, Input } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";

const UserFilter = () => {
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
    <>
      <Input placeholder="Input component" />
      <ActionIcon>
        <CiFilter></CiFilter>
      </ActionIcon>
    </>
  );
};
export default UserFilter;

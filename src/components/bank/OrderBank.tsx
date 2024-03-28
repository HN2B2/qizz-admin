import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PAGE_SIZE } from "@/pages/bank";

const orderData = [
  { value: "quizBankId", label: "Default" },
  { value: "name", label: "Name" },
  { value: "createdAt", label: "Created at" },
];

const OrderBank = () => {
  const router = useRouter();
  const { keyword, order, sort, page, subCategoryIds } = router.query;
  const [orderValue, setOrderValue] = useState<string | null>("quizBankId");

  useEffect(() => {
    if (router.isReady) {
      setOrderValue((order as string) || "quizBankId");
    }
  }, [router.isReady, keyword]);

  const handleChangeOrder = (value: string | null) => {
    setOrderValue(value);
    router.push({
      pathname: "/bank",
      query: {
        limit: PAGE_SIZE,
        page,
        keyword,
        order: value,
        sort,
        subCategoryIds,
      },
    });
  };

  return (
    <Select
      placeholder="Sort by"
      data={orderData}
      value={orderValue}
      onChange={handleChangeOrder}
    />
  );
};

export default OrderBank;

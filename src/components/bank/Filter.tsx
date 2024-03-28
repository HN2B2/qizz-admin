import React, { useEffect, useState } from "react";
import { TextInput, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { PAGE_SIZE } from "@/pages/bank";

const Filter = () => {
  const router = useRouter();

  const [min, setMin] = useState<string | null>("");
  const [max, setMax] = useState<string | null>("");
  const { keyword, order, sort, page, subCategoryIds, mi, ma } = router.query;

  useEffect(() => {
    if (router.isReady) {
      setMin(mi as string);
      setMax(ma as string);
    }
  }, [router.isReady]);

  const handleMinQuestions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMin(e.target.value);
    router.push({
      pathname: "/bank",
      query: {
        limit: PAGE_SIZE,
        page,
        keyword,
        order,
        sort,
        subCategoryIds,
        mi: e.target.value,
        ma,
      },
    });
  };
  const handleMaxQuestions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMax(e.target.value);
    router.push({
      pathname: "/bank",
      query: {
        limit: PAGE_SIZE,
        page,
        keyword,
        order,
        sort,
        subCategoryIds,
        mi,
        ma: e.target.value,
      },
    });
  };
  return (
    <>
      <Title size="md">Filter</Title>
      <TextInput
        label="Min questions"
        placeholder="Min questions"
        onChange={handleMinQuestions}
      />
      <TextInput
        label="Max questions"
        placeholder="Max questions"
        onChange={handleMaxQuestions}
      />
    </>
  );
};

export default Filter;

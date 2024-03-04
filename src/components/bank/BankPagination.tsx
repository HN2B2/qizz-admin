import { Pagination } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BankPagination = ({ total }: { total: number }) => {
  const router = useRouter();
  const { keyword, order, sort, page, subCategoryIds } = router.query;
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    if (router.query.page) {
      setPage(Number(router.query.page));
    }
  }, [router.query.page]);

  const handleChangePage = (value: number) => {
    setPage(value);
    router.push({
      pathname: "/bank",
      query: {
        keyword,
        order,
        sort,
        page: value,
        subCategoryIds,
      },
    });
  };

  return (
    <Pagination onChange={handleChangePage} total={total} value={activePage} />
  );
};

export default BankPagination;

import { Pagination } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UserPagination = ({
  total,
  pageSize,
}: {
  total: number;
  pageSize: number;
}) => {
  const router = useRouter();
  const { page } = router.query;
  const [pagenum, setPagenum] = useState(1);

  const totalPage = Math.ceil(total / pageSize);

  useEffect(() => {
    if (router.isReady) {
      if (!page) {
        setPagenum(1);
        return;
      }
      if (parseInt(page as string) > totalPage) {
        setPagenum(totalPage);
        return;
      }
      setPagenum(parseInt(page as string) || 1);
    }
  }, [router.isReady, page]);

  const handleChangePage = (page: number) => {
    router.query.page = page.toString();
    router.push(router);
  };

  return (
    <Pagination
      total={totalPage}
      value={pagenum}
      onChange={handleChangePage}
      mt={12}
    />
  );
};

export default UserPagination;

import Head from "next/head";
import React from "react";
import { useEffect, useState } from "react";
import {
  ActionIcon,
  Checkbox,
  Divider,
  Grid,
  Group,
  Paper,
  Title,
  getRadius,
} from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { BreadCrumbsItem, MainLayout } from "@/components/layouts";
import { SearchBar } from "@/components/bank";
import { useRouter } from "next/router";
import BankTable from "@/components/bank/BankTable";
import Filter from "@/components/bank/Filter";
import { Bank } from "@/types/bank";
import { createContext } from "vm";
import { useListState } from "@mantine/hooks";
import { instance } from "@/utils";
import Details from "@/components/bank/Details";
import { GetServerSidePropsContext } from "next";
import CategoryFilter from "@/components/bank/CategoryFilter";

export const PAGE_SIZE = 10;
// const router = useRouter();
const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Quiz Admin", link: "/" },
  { title: "Bank", link: "/bank" },
];

interface BankResponse {
  data: Bank[];
  total: number;
}

interface BankPageProps {
  bankData: BankResponse;
}

// export const BankDataContext = createContext<any>({} as any);
export const BankDataContext = createContext({});

const BankPage = ({ bankData }: BankPageProps) => {
  const [bankList, handlers] = useListState(bankData.data);
  const [total, setTotal] = useState(bankData.total);

  const router = useRouter();
  const { page = "1", keyword, order, sort } = router.query;

  const handleFetchBankData = async () => {
    try {
      const res = await instance.get(`/manageBanks`, {
        params: {
          limit: PAGE_SIZE,
          page,
          keyword,
          order,
          sort,
        },
      });
      const bankData = res.data;
      handlers.setState(bankData.data);
      setTotal(bankData.total);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(bankData);

  useEffect(() => {
    handleFetchBankData();
  }, [page, keyword, order, sort]);

  const handleReset = () => {
    router.push({
      pathname: "/bank",
    });
  };

  const totalPage = Math.ceil(total / PAGE_SIZE);
  return (
    <MainLayout title="Bank" breadcrumbs={breadcrumbsItems}>
      <Paper p={"md"} my={"md"} shadow="sm">
        <Group justify="space-between">
          <SearchBar />
          <Group>
            <Group>
              {/* <OrderCategory /> */}
              {/* <SortCategory /> */}
              <ActionIcon color="red" size={"lg"}>
                <IconX size={"1rem"} />
              </ActionIcon>
            </Group>
          </Group>
          <Group />
        </Group>
      </Paper>
      <Grid>
        <Grid.Col span={2}>
          <Paper p={"md"} my={"md"} shadow="sm">
            <Group justify="space-between">
              <Group>
                <Filter />
                <CategoryFilter />
              </Group>
            </Group>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper p={"md"} my={"md"} shadow="sm">
            <Group justify="space-between">
              <Group>
                <BankTable />
              </Group>
            </Group>
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper p={"md"} my={"md"} shadow="sm">
            <Group justify="space-between">
              <Group>
                <Details />
              </Group>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </MainLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { req, query } = context;
    const { page = "1", keyword, order, sort } = query;

    const res = await instance.get(`/manageBanks`, {
      params: {
        limit: PAGE_SIZE,
        page,
        keyword,
        order,
        sort,
      },
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie || "",
      },
    });
    const bankData = res.data;
    return {
      props: {
        bankData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default BankPage;

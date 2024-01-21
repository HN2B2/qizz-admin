import { Title, getRadius } from "@mantine/core";
import Head from "next/head";
import AdminLayout, { BreadCrumbsItem } from "@/components/layouts/AdminLayout";
import { useEffect, useState } from "react";
import doAxios from "@/utils/doAxios";
import { Breadcrumbs, Anchor } from "@mantine/core";

export default function Home() {
  const [data, setdata] = useState(null);

  const fetchdata = async () => {
    const { response } = await doAxios("GET", "/");
    setdata(response);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const breadcrumbsItems: BreadCrumbsItem[] = [
    { title: "Quiz Admin", link: "./" },
  ];

  return (
    <AdminLayout breadcrumbs={breadcrumbsItems}>
      <></>
      {/* <p>{data}</p> */}
    </AdminLayout>
  );
}

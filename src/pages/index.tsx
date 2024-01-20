import { Title, getRadius } from "@mantine/core";
import Head from "next/head";
import AdminLayout from "@/components/layouts/AdminLayout";
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

  const items = [{ title: "Quiz Admin", href: "./" }].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <AdminLayout>
      <Breadcrumbs>{items}</Breadcrumbs>
      {/* <Title order={1}>Qizz Admin</Title> */}
      {/* <p>{data}</p> */}
    </AdminLayout>
  );
}

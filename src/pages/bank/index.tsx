import Head from "next/head";
import React from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useEffect, useState } from "react";
import { Title, getRadius } from "@mantine/core";
import { Breadcrumbs, Anchor } from "@mantine/core";

const items = [
  { title: "Quiz Admin", href: "./" },
  { title: "Bank", href: "./bank" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));
const UserPage = () => {
  return (
    <AdminLayout title="Bank">
      <Breadcrumbs>{items}</Breadcrumbs>
    </AdminLayout>
  );
};

export default UserPage;

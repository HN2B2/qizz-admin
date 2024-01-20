import Head from "next/head";
import React from "react";
import AdminLayout, { BreadCrumbsItem } from "@/components/layouts/AdminLayout";
import { useEffect, useState } from "react";
import { Title, getRadius } from "@mantine/core";
import { Breadcrumbs, Anchor } from "@mantine/core";

const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Quiz Admin", link: "./" },
  { title: "Bank", link: "./bank" },
];
const UserPage = () => {
  return (
    <AdminLayout title="Bank" breadcrumbs={breadcrumbsItems}>
      <p></p>
    </AdminLayout>
  );
};

export default UserPage;

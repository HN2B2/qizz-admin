import Head from "next/head";
import React from "react";
import AdminLayout, { BreadCrumbsItem } from "@/components/layouts/AdminLayout";
import { useEffect, useState } from "react";
import { Title, getRadius } from "@mantine/core";
import { Breadcrumbs, Anchor, Text, Paper } from "@mantine/core";

const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Quiz Admin", link: "./" },
  { title: "Category", link: "./category" },
];
const CategoryPage = () => {
  return (
    <AdminLayout title="Category" breadcrumbs={breadcrumbsItems}>
      <Paper shadow="xs" p="xl">
        <Text>
          Use it to create cards, dropdowns, modals and other components that
          require background with shadow
        </Text>
      </Paper>
    </AdminLayout>
  );
};

export default CategoryPage;

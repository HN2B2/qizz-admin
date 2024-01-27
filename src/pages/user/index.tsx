import Head from "next/head"
import React from "react"
import { useEffect, useState } from "react"
import { Title, getRadius } from "@mantine/core"
import { Breadcrumbs, Anchor } from "@mantine/core"
import { BreadCrumbsItem, MainLayout } from "@/components/layouts"

const breadcrumbsItems: BreadCrumbsItem[] = [
    { title: "Quiz Admin", link: "./" },
    { title: "User", link: "./user" },
]
const UserPage = () => {
    return (
        <MainLayout title="User" breadcrumbs={breadcrumbsItems}>
            <></>
        </MainLayout>
    )
}

export default UserPage

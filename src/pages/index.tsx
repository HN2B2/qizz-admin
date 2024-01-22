import { Title, getRadius } from "@mantine/core"
import Head from "next/head"
import AdminLayout, { BreadCrumbsItem } from "@/components/layouts/AdminLayout"
import { useEffect, useState } from "react"
import { Breadcrumbs, Anchor } from "@mantine/core"

export default function Home() {
    const breadcrumbsItems: BreadCrumbsItem[] = [
        { title: "Quiz Admin", link: "./" },
    ]

    return (
        <AdminLayout breadcrumbs={breadcrumbsItems}>
            <></>
        </AdminLayout>
    )
}

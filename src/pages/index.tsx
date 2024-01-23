import AdminLayout, { BreadCrumbsItem } from "@/components/layouts/AdminLayout"
import Link from "next/link"

export default function Home() {
    const breadcrumbsItems: BreadCrumbsItem[] = [
        { title: "Quiz Admin", link: "./" },
    ]

    return (
        <AdminLayout breadcrumbs={breadcrumbsItems}>
            <Link href="/auth/logout">Logout</Link>
        </AdminLayout>
    )
}

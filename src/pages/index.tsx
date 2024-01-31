import { BreadCrumbsItem, MainLayout } from "@/components/layouts"
import Link from "next/link"

export default function Home() {
    const breadcrumbsItems: BreadCrumbsItem[] = [
        { title: "Quiz Admin", link: "./" },
    ]

    return (
        <MainLayout breadcrumbs={breadcrumbsItems}>
            <Link href="/auth/logout">Logout</Link>
        </MainLayout>
    )
}

import { AppShell, NavLink } from "@mantine/core"
import { useRouter } from "next/router"

interface NavbarItem {
    title: string
    link: string
    icon: React.ReactNode
}

interface NavbarProps {
    navbarItems: NavbarItem[]
}

const Navbar = ({ navbarItems }: NavbarProps) => {
    const router = useRouter()
    return (
        <AppShell.Navbar p="md">
            {navbarItems.map((item, index) => (
                <NavLink
                    href={item.link || "#"}
                    key={index}
                    label={item.title}
                    leftSection={item.icon}
                    variant="light"
                    active={router.pathname === item.link}
                />
            ))}
        </AppShell.Navbar>
    )
}

export default Navbar

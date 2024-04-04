import {
    AppShell,
    Burger,
    Button,
    Group,
    Image,
    useComputedColorScheme,
} from "@mantine/core"
import Link from "next/link"
import { instance } from "@/utils"
import { useState } from "react"
import { useRouter } from "next/router"

const Logo = () => {
    const colorScheme = useComputedColorScheme("light")
    const logoUrl =
        colorScheme === "dark"
            ? "/logo/logo-3-white.png"
            : "/logo/logo-3-color.png"

    return (
        <Link href="/">
            <Image src={logoUrl} alt="Qizz" h={46} fit="contain" />
        </Link>
    )
}

interface HeaderProps {
    burger?: boolean
    mobileOpened?: boolean
    toggleMobile?: () => void
    desktopOpened?: boolean
    toggleDesktop?: () => void
}

const Header = ({
    burger = false,
    mobileOpened,
    toggleMobile,
    desktopOpened,
    toggleDesktop,
}: HeaderProps) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const handleSignOut = async () => {
        setLoading(true)
        try {
            await instance.post("auth/logout")
            router.reload()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AppShell.Header>
            <Group h="100%" px="md" justify="space-between">
                <Group h="100%">
                    {burger && (
                        <>
                            <Burger
                                opened={mobileOpened}
                                onClick={toggleMobile}
                                hiddenFrom="sm"
                                size="sm"
                            />
                            <Burger
                                opened={desktopOpened}
                                onClick={toggleDesktop}
                                visibleFrom="sm"
                                size="sm"
                            />
                        </>
                    )}
                    <Logo />
                </Group>
                <Group>
                    <Button
                        loading={loading}
                        onClick={handleSignOut}
                        color="red"
                    >
                        Sign out
                    </Button>
                </Group>
            </Group>
        </AppShell.Header>
    )
}

export default Header

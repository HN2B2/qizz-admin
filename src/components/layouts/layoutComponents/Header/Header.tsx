import {
    ActionIcon,
    AppShell,
    Burger,
    Group,
    Image,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core"
import { IconMoon, IconSun } from "@tabler/icons-react"
import classes from "./SwitchSchemeBtn.module.css"
import Link from "next/link"

const Logo = () => {
    const colorScheme = useComputedColorScheme("light")
    const logoUrl =
        colorScheme === "dark"
            ? "/logo/logo-3-white.png"
            : "/logo/logo-3-color.png"
    console.log(colorScheme)

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
    const { setColorScheme } = useMantineColorScheme({
        keepTransitions: true,
    })
    const computedColorScheme = useComputedColorScheme("light")

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === "dark" ? "light" : "dark")
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
                    <ActionIcon
                        color="gray"
                        size="lg"
                        variant="outline"
                        onClick={toggleColorScheme}
                        aria-label="Toggle color scheme"
                        radius="md"
                    >
                        <IconSun stroke={1.5} className={classes.light} />
                        <IconMoon stroke={1.5} className={classes.dark} />
                    </ActionIcon>
                </Group>
            </Group>
        </AppShell.Header>
    )
}

export default Header

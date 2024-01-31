import { LoginRequest, AuthResponse } from "@/types/auth"
import { UserResponse } from "@/types/user"
import { getServerErrorNoti, instance } from "@/utils"
import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Container,
    Group,
    Button,
    Divider,
    Flex,
    Text,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure, useHotkeys, useLocalStorage } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconBrandGoogleFilled } from "@tabler/icons-react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"

const LoginPage = () => {
    const [_, setUser] = useLocalStorage<UserResponse>({
        key: "user",
    })

    const loginForm = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) =>
                /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
            password: (value) => {
                if (value.length < 6) {
                    return "Password should be at least 6 characters long"
                }
                if (!/\d/.test(value)) {
                    return "Password should contain at least one digit"
                }
                if (!/[a-z]/.test(value)) {
                    return "Password should contain at least one lowercase letter"
                }
                if (!/[A-Z]/.test(value)) {
                    return "Password should contain at least one uppercase letter"
                }
                if (!/\W/.test(value)) {
                    return "Password should contain at least one special character"
                }
                return null
            },
        },
    })

    const [
        loading,
        { toggle: toggleLoading, close: closeLoading, open: openLoading },
    ] = useDisclosure()

    const router = useRouter()
    const handleLogin = async () => {
        openLoading()

        loginForm.validate()
        if (!loginForm.isValid()) {
            closeLoading()
            return
        }

        try {
            const { data }: { data: AuthResponse } = await instance.post(
                "/auth/login",
                loginForm.values as LoginRequest
            )
            setUser(data.user)
            router.push("/")
        } catch (error) {
            notifications.show({
                title: "Error",
                message: getServerErrorNoti(error),
                color: "red",
            })
        } finally {
            closeLoading()
        }
    }

    useHotkeys([["enter", handleLogin]])
    return (
        <>
            <Head>
                <title>Login | Qizz</title>
            </Head>
            <Flex align={"center"} justify={"center"} w={"100%"} h={"100vh"}>
                <Container size="xl">
                    <Paper
                        withBorder
                        shadow="md"
                        p={30}
                        mt={20}
                        radius="md"
                        w={"400px"}
                    >
                        <Title mb={16} order={2}>
                            Welcome back!
                        </Title>
                        <TextInput
                            label="Email"
                            placeholder="email@qizz.tech"
                            required
                            {...loginForm.getInputProps("email")}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            required
                            mt="md"
                            {...loginForm.getInputProps("password")}
                        />
                        <Group justify="end" mt="lg">
                            {/* <Checkbox label="Remember me" /> */}
                            <Anchor component="button" size="sm">
                                Forgot password?
                            </Anchor>
                        </Group>
                        <Button
                            fullWidth
                            mt="xl"
                            mb={12}
                            loading={loading}
                            onClick={handleLogin}
                        >
                            Sign in
                        </Button>
                        <Divider label="Or continue with" />
                        <Button
                            fullWidth
                            my="md"
                            variant="default"
                            leftSection={
                                <IconBrandGoogleFilled size={"1rem"} />
                            }
                            onClick={() =>
                                notifications.show({
                                    title: "Error",
                                    message:
                                        "This feature is not available yet",
                                    color: "red",
                                })
                            }
                        >
                            Google
                        </Button>
                    </Paper>
                </Container>
            </Flex>
        </>
    )
}

export default LoginPage

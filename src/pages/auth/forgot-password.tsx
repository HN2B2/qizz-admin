import { getServerErrorNoti, instance } from "@/utils"
import {
    Button,
    Container,
    Divider,
    Flex,
    Paper,
    Text,
    TextInput,
    Title,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import Head from "next/head"
import Link from "next/link"
import React, { useState } from "react"

const ForgotPasswordPage = () => {
    const forgotPasswordForm = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) =>
                /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
        },
    })
    const [loading, { close: closeLoading, open: openLoading }] =
        useDisclosure()

    const [sended, setSended] = useState(false)

    const handleForgotPassword = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        openLoading()

        forgotPasswordForm.validate()
        if (!forgotPasswordForm.isValid()) {
            closeLoading()
            return
        }

        try {
            await instance.post("auth/forgot-password", {
                json: {
                    email: forgotPasswordForm.values.email,
                },
            })
            setSended(true)
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

    return (
        <>
            <Head>
                <title>Forgot password | Qizz</title>
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
                        <Title mb={8} order={2}>
                            <Link href="/">Forgot password</Link>
                        </Title>
                        {sended ? (
                            <>
                                <form onSubmit={handleForgotPassword}>
                                    <Text size="sm" c="gray" mb={16}>
                                        We have sent you a link to reset your
                                        password, please check your email
                                    </Text>
                                    <Button
                                        fullWidth
                                        my="md"
                                        variant="default"
                                        type="submit"
                                        loading={loading}
                                    >
                                        Resend link
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Text size="sm" c="gray" mb={16}>
                                    Enter your email address and we will send
                                    you a link to reset your password
                                </Text>
                                <form onSubmit={handleForgotPassword}>
                                    <TextInput
                                        label="Email"
                                        placeholder="email@qizz.tech"
                                        required
                                        {...forgotPasswordForm.getInputProps(
                                            "email"
                                        )}
                                    />
                                    <Button
                                        fullWidth
                                        mt="xl"
                                        mb={12}
                                        loading={loading}
                                        type="submit"
                                    >
                                        Send reset link
                                    </Button>
                                </form>
                                <Divider label="Or" />
                                <Button
                                    component={Link}
                                    href="/auth/login"
                                    fullWidth
                                    my="md"
                                    variant="default"
                                >
                                    Login
                                </Button>
                            </>
                        )}
                    </Paper>
                </Container>
            </Flex>
        </>
    )
}

export default ForgotPasswordPage

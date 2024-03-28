export const runtime = "experimental-edge"

import { AuthResponse } from "@/types/auth"
import { UserResponse } from "@/types/user"
import { getServerErrorNoti, instance } from "@/utils"
import {
    Button,
    Container,
    Flex,
    Paper,
    PasswordInput,
    Title,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure, useLocalStorage } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const passwordValidation = (value: string) => {
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
}

const ResetPasswordPage = () => {
    const [_, setUser] = useLocalStorage<UserResponse>({
        key: "user",
    })
    const resetPasswordForm = useForm({
        initialValues: {
            password: "",
            rePassword: "",
        },
        validate: {
            password: passwordValidation,
            rePassword: passwordValidation,
        },
    })

    const [loading, { close: closeLoading, open: openLoading }] =
        useDisclosure()

    const router = useRouter()
    const { token } = router.query
    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        openLoading()

        resetPasswordForm.validate()
        if (!resetPasswordForm.isValid()) {
            closeLoading()
            return
        }
        if (
            resetPasswordForm.values.password !==
            resetPasswordForm.values.rePassword
        ) {
            closeLoading()
            notifications.show({
                title: "Error",
                message: "Password does not match!",
                color: "red",
            })
            return
        }

        try {
            const data: AuthResponse = await instance
                .post("auth/reset-password", {
                    json: {
                        password: resetPasswordForm.values.password,
                        token: token as string,
                    },
                })
                .json()
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
    return (
        <>
            <Head>
                <title>Reset password | Qizz</title>
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
                            <Link href="/">Reset password</Link>
                        </Title>

                        <form onSubmit={handleResetPassword}>
                            <PasswordInput
                                label="New password"
                                placeholder="New password"
                                required
                                mt="md"
                                {...resetPasswordForm.getInputProps("password")}
                            />

                            <PasswordInput
                                label="Repeat new password"
                                placeholder="Repeat new password"
                                required
                                mt="md"
                                {...resetPasswordForm.getInputProps(
                                    "rePassword"
                                )}
                            />
                            <Button
                                fullWidth
                                mt="xl"
                                mb={12}
                                loading={loading}
                                type="submit"
                            >
                                Reset password
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </Flex>
        </>
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { token } = context.query
    if (!token) {
        return {
            notFound: true,
        }
    } else {
        try {
            await instance.post("auth/check-reset-token", {
                json: {
                    token: token as string,
                },
            })
            return {
                props: {},
            }
        } catch (error) {
            return {
                notFound: true,
            }
        }
    }
}

export default ResetPasswordPage

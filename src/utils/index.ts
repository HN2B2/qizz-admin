import axios from "axios"

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

export const instance = axios.create({
    baseURL: process.env.API_URL || "http://localhost:6868/v1",
})

instance.interceptors.request.use(
    function (config) {
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("accessToken")
                : null

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

export const getServerErrorNoti = (error: any) => {
    if (axios.isAxiosError(error) && error.response && error.response.data) {
        const { data } = error.response
        if (data.message) {
            return data.message
        }
    } else {
        return "Something went wrong"
    }
}

export const logout = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        window.location.href = "/auth/login"
    }
}

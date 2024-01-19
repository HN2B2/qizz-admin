import axios from "axios"

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

axios.defaults.baseURL = process.env.API_URL || "http://localhost:6868/v1"

const doAxios = async <T>(method: HttpMethod, url: string, body?: T) => {
    let response = null
    let error = ""
    let loading = true

    try {
        const accessToken = localStorage.getItem("accessToken")
        const result = await axios.request({
            method,
            url,
            data: body,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        response = result.data
    } catch (error) {
        error = error
    } finally {
        loading = false
    }

    return { response, error, loading }
}

export default doAxios

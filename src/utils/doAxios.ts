import axios from "axios"

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

axios.defaults.baseURL = process.env.API_URL || "http://localhost:6868"

// get access token from local storage
const accessToken = localStorage.getItem("accessToken")
if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
}

const doAxios = async <T>(method: HttpMethod, url: string, body?: T) => {
    let response = null
    let error = ""
    let loading = true

    try {
        const result = await axios.request({
            method,
            url,
            data: body,
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

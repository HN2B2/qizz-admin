import { useEffect, useState } from "react"
import axios from "axios"

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

axios.defaults.baseURL = "https://todo-api-zoeg.onrender.com/v1"
// axios.defaults.baseURL = "http://localhost:8080"

const useAxios = <T>(method: HttpMethod, url: string, body?: T) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState<string | unknown>("")
    const [loading, setLoading] = useState(true)

    const fetchData = async (method: HttpMethod, url: string, body?: T) => {
        try {
            const result = await axios.request({
                method,
                url,
                data: body,
            })
            setResponse(result.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(method, url, body)
    }, [])

    return { response, error, loading }
}

export default useAxios

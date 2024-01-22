import CustomLoadingOverlay from "@/components/common/CustomLoadingOverlay"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"

const withAuth = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => {
    const WithAuth: React.FC<P> = (props) => {
        const [loading, setLoading] = useState(true)

        const router = useRouter()
        useEffect(() => {
            const checkLocalStorage = () => {
                const accessToken = localStorage.getItem("accessToken")
                if (!accessToken) {
                    router.push("/auth/login")
                }
                setLoading(false)
            }

            if (window.localStorage) {
                checkLocalStorage()
            } else {
                router.push("/auth/login")
            }
        }, [])

        if (loading) {
            return <CustomLoadingOverlay infinite />
        }

        return <WrappedComponent {...props} />
    }

    return WithAuth
}

export default withAuth

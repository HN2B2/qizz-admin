import { LoadingOverlay } from "@mantine/core"
import React, { useEffect, useState } from "react"

const CustomLoadingOverlay = ({ infinite = false }: { infinite?: boolean }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!infinite) {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
    }, [])

    return (
        <LoadingOverlay
            visible={loading}
            zIndex={500}
            overlayProps={{ blur: 20 }}
        />
    )
}

export default CustomLoadingOverlay

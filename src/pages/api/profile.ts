export const config = {
    runtime: "experimental-edge",
}

import { RequestCookies } from "@edge-runtime/cookies"

export default async function (req: any) {
    const cookies = new RequestCookies(req.headers)
    return new Response(
        JSON.stringify({
            user: cookies.get("user")?.value || null,
            token: cookies.get("token")?.value || null,
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}

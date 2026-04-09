import { createAuthClient } from "better-auth/react"

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://planora-server-eta.vercel.app"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: BASE_URL,
})
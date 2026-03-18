export const API_BASE = "https://skillbridge-server-kappa.vercel.app/api";

export const fetcher = async (url: string, options: RequestInit = {}
) => {
    const res = await fetch(`${API_BASE}${url}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
        ...options,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Something went wrong");

    return data;
}
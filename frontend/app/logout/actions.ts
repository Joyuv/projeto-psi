"use client"

// import { redirect } from "next/navigation";

export async function logout() {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const options = {
        method: "POST",
        credentials: "include" as RequestCredentials
    }
    const response = await fetch(`${apiUrl}/api/logout`, options);

    return response;
}
"use server";

import { redirect } from "next/navigation";


export default async function cadastroAction(data: { username:string; email: string; password: string; }) {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const url = `${apiUrl}/cadastro`;
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }

    const response = await fetch(url, options);
    const result = await response.json();
    if (response.status !== 201) {
        return result.message;
    }
    redirect("/login");
}
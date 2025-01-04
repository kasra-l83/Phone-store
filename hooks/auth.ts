import { useEffect } from "react";
import { notFound } from "next/navigation";
import { Auth } from "@/providers/auth.provider";

export default function useAuth() {
    const {user}= Auth();
    const token= localStorage.getItem("token");

    useEffect(() =>{
        if (!token || user!== "admin") {
            return notFound();
        }
    }, [token, user])
}
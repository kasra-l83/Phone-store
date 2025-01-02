import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Auth } from "@/providers/auth.provider";
import { notFound } from "next/navigation";

export default function useAuth() {
    const router= useRouter();
    const {user, logout}= Auth();
    const token= localStorage.getItem("token");

    useEffect(() =>{
        if (!token || user!== "admin") {
            return notFound();
        }else {
            const tokenPayload= JSON.parse(atob(token.split('.')[1]));
            const tokenExpired= tokenPayload.exp * 1000 < Date.now() || (Date.now() - tokenPayload.iat * 1000) > 15 * 60 * 1000;
            if (tokenExpired) {
                logout();
                localStorage.removeItem("token");
                toast.error("Your token expired");
                router.push("/");
            }
        }
    }, [token, user])
}
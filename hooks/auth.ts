import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Auth } from "@/providers/auth.provider";

export default function useAuth() {
    const router= useRouter();
    const {user, logout}= Auth();
    const token= localStorage.getItem("token");

    useEffect(() =>{
        if (!token) {
            toast.error("You are not authorize")
            router.push("/");
        }else if(user!== "admin"){
            toast.error("You dont have access to this page")
            router.push("/");
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
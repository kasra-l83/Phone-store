import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useAuth = () => {
    const router = useRouter();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            router.push("/");
        } else {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const isTokenExpired = tokenPayload.exp * 1000 < Date.now() || (Date.now() - tokenPayload.iat * 1000) > 15 * 60 * 1000;
            if (isTokenExpired) {
                localStorage.removeItem("token");
                toast.error("Your token expired")
                router.push("/");
            }
        }
    }, [router, token]);
}

export default useAuth;
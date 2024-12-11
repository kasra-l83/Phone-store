import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/");
        } else {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const isTokenExpired = tokenPayload.exp * 1000 < Date.now() || (Date.now() - tokenPayload.iat * 1000) > 15 * 60 * 1000;
            if (isTokenExpired) {
                localStorage.removeItem("token");
                router.push("/");
            }
        }
    }, [router]);
};

export default useAuth;
"use client"

import React, { createContext, useState, useContext, useEffect } from "react";

const authContext = createContext<{
    user: "admin" | "user" | null;
    login: (role: "admin" | "user") => void;
    logout: () => void;
}>({
    user: null,
    login: () => {},
    logout: () => {}
})

export default function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<"admin" | "user" | null>(() => {
        return sessionStorage.getItem("user") as "admin" | "user" | null;
    })

    const login = (role: "admin" | "user") => {
        setUser(role);
        sessionStorage.setItem("user", role);
    }
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("user");
    }

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user") as "admin" | "user" | null;
        if (storedUser) {
            setUser(storedUser);
        }
    }, [])

    return (
        <authContext.Provider value={{user, login, logout}}>
            {children}
        </authContext.Provider>
    )
}

export const Auth = () => {
    return useContext(authContext);
}
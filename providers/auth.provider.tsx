"use client"

import React, { createContext, useState, useContext } from "react";

const authContext= createContext({
    user: null,
    login: (role: "admin" | "user") => {},
    logout: () => {}
})
export default function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser]= useState<"admin" | "user" | null>(null);

    const login= (role: "admin" | "user") =>{
        setUser(role);
    }
    const logout= () =>{
        setUser(null);
    }

    return(
        <authContext.Provider value={{user, login, logout}}>
            {children}
        </authContext.Provider>
    )
}
export const Auth= () =>{
    return useContext(authContext)
}
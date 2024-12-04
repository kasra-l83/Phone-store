"use client"

import { useRouter } from "next/navigation";

export const Button: React.FC= () =>{
    const { push } = useRouter();
    const click= () =>{
        push("/login")
    }

    return (
        <button onClick={click} className="text-blue-500 w-40 py-[10px] bg-gray-100 rounded-lg hover:bg-gray-300">ورود یا ثبت نام</button>
    )
}
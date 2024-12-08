"use client"

import { useForm, Controller } from "react-hook-form"
import { Input } from "./Input"
import { authSchema, authSchemaType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

export const LoginForm: React.FC= () =>{
    const {control, handleSubmit, reset}= useForm<authSchemaType>({
        resolver: zodResolver(authSchema),
        mode:"all"
    })
    
    const submit= async (data: authSchemaType) =>{
        const response = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('token', result.token.accessToken);
            toast.success("ورود موفق")
            reset();
            setTimeout(() =>{
                window.location.href= "/orders"
            }, 3000);
        } else {
            toast.error("نام کاربری یا رمز عبور نامعتبر")
        }
    }
    
    return(
        <form name="login" className='w-full flex flex-col gap-y-5' onSubmit={handleSubmit(submit)}>
            <Controller defaultValue="" name='username' control={control} render={({field, fieldState: {error}}) =>(
                <Input {...field} error={error?.message} label='نام کاربری'/>
            )}/>
            <Controller defaultValue="" name='password' control={control} render={({field, fieldState: {error}}) =>(
                <Input type="password" {...field} error={error?.message} label='رمز عبور'/>
            )}/>
            <button type="submit" className='w-full bg-blue-500 rounded-lg text-white h-10 hover:bg-blue-700'>ورود</button>
        </form>
    )
}
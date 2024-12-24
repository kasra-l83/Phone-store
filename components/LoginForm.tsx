"use client"

import { useForm, Controller } from "react-hook-form"
import { Input } from "./Input"
import { authSchema, authSchemaType } from "../utils/validation";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/apis/mutation";
import { errorHandler } from "../utils/errorHandler";
import React from "react";
import { toast } from "react-toastify";

export const LoginForm: React.FC= () =>{
    const {control, handleSubmit, reset}= useForm<authSchemaType>({
        resolver: zodResolver(authSchema),
        mode:"all"
    })
    
    const login= useLogin();
    const submit= (data: authSchemaType) =>{
        login.mutate(data);
    }

    React.useEffect(() =>{
        if (!login.data || !login.isSuccess) return;
        localStorage.setItem("token", login.data?.token.accessToken);
        toast.success("login successfully");
        reset();
        setTimeout(() =>{
            window.location.href= "/admin/orders"
        }, 3000);
    }, [login.data, login.isSuccess])
    React.useEffect(() =>{
        if (!login.error || !login.isError) return;
            errorHandler(login.error as AxiosError);
    }, [login.error, login.isError])
    
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
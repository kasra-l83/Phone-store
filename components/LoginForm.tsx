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
import { Auth } from "@/providers/auth.provider";
import { useRouter } from "next/navigation";

export const LoginForm: React.FC= () =>{
    const {control, handleSubmit, reset}= useForm<authSchemaType>({
        resolver: zodResolver(authSchema),
        mode:"all"
    })
    
    const router= useRouter();
    const {login}= Auth();
    const log= useLogin();
    const submit= (data: authSchemaType) =>{
        log.mutate(data);
    }

    React.useEffect(() =>{
        if (!log.data || !log.isSuccess) return;
        localStorage.setItem("token", log.data?.token.accessToken);
        reset();
        toast.success("login successfully");
        if(log.data?.data.user.role=== "ADMIN"){
            login("admin");
            setTimeout(() =>{
                router.push("/admin/orders");
            }, 3000);
        }else{
            login("user");
            setTimeout(() =>{
                router.push("/");
            }, 3000);
        }
    }, [log.data, log.isSuccess])
    React.useEffect(() =>{
        if (!log.error || !log.isError) return;
            errorHandler(log.error as AxiosError);
    }, [log.error, log.isError])
    
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
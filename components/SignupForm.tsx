"use client"

import { useForm, Controller } from "react-hook-form"
import { Input } from "./Input"
import { signupSchema, signupSchemaType } from "../utils/validation";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "@/apis/mutation";
import { errorHandler } from "../utils/errorHandler";
import React from "react";
import { toast } from "react-toastify";
import { Auth } from "@/providers/auth.provider";
import { useRouter } from "next/navigation";

export const SignupForm: React.FC= () =>{
    const {control, handleSubmit, reset}= useForm<signupSchemaType>({
        resolver: zodResolver(signupSchema),
        mode:"all"
    })
    
    const signup= useSignup();
    const {login}= Auth();
    const router= useRouter();
    const submit= (data: signupSchemaType) =>{
        signup.mutate(data);
    }

    React.useEffect(() =>{
        if (!signup.data || !signup.isSuccess) return;
        toast.success("Signup successfully");
        localStorage.setItem("token", signup.data?.token.accessToken)
        reset();
        login("user");
        setTimeout(() =>{
            router.push("/");
        }, 3000);
    }, [signup.data, signup.isSuccess])
    React.useEffect(() =>{
        if (!signup.error || !signup.isError) return;
        errorHandler(signup.error as AxiosError);
        console.log(signup);
    }, [signup.error, signup.isError])
    
    return(
        <form name="signup" className='w-full flex flex-col gap-y-5' onSubmit={handleSubmit(submit)}>
            <span className="flex gap-x-3">
                <Controller defaultValue="" name='firstname' control={control} render={({field, fieldState: {error}}) =>(
                    <Input {...field} error={error?.message} label='نام'/>
                )}/>
                <Controller defaultValue="" name='lastname' control={control} render={({field, fieldState: {error}}) =>(
                    <Input {...field} error={error?.message} label='نام خانوادگی'/>
                )}/>
            </span>
            <span className="flex gap-x-3">
                <Controller defaultValue="" name='username' control={control} render={({field, fieldState: {error}}) =>(
                    <Input {...field} error={error?.message} label='نام کاربری'/>
                )}/>
                <Controller defaultValue="" name='password' control={control} render={({field, fieldState: {error}}) =>(
                    <Input type="password" {...field} error={error?.message} label='رمز عبور'/>
                )}/>
            </span>
            <span className="flex gap-x-3">
                <Controller defaultValue="" name='phoneNumber' control={control} render={({field, fieldState: {error}}) =>(
                    <Input {...field} error={error?.message} label='شماره همراه'/>
                )}/>
                <Controller defaultValue="" name='address' control={control} render={({field, fieldState: {error}}) =>(
                    <Input {...field} error={error?.message} label='شهر'/>
                )}/>
            </span>
            <button type="submit" className='w-full bg-blue-500 rounded-lg text-white h-10 hover:bg-blue-700'>ثبت</button>
        </form>
    )
}
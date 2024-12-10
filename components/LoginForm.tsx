"use client"

import { useForm, Controller } from "react-hook-form"
import { Input } from "./Input"
import { authSchema, authSchemaType } from "../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { urls } from "@/apis/urls";
import { generateClient } from "@/apis/client";

export const LoginForm: React.FC= () =>{
    const {control, handleSubmit, reset}= useForm<authSchemaType>({
        resolver: zodResolver(authSchema),
        mode:"all"
    })
    
    const mutation= useMutation(async (data: authSchemaType) =>{
        const client= generateClient();
        const response= await client.post(urls.user.login, data);
        return response.data;
    }, {
        onSuccess: (result) =>{
            localStorage.setItem("token", result.token.accessToken);
            toast.success("ورود موفق");
            reset();
            setTimeout(() =>{
                window.location.href= "/admin/orders"
            }, 3000);
        },
        onError: () =>{
            toast.error("نام کاربری یا رمز عبور نامعتبر");
        }
    })

    const login= (data: authSchemaType) =>{
        mutation.mutate(data);
    }
    
    return(
        <form name="login" className='w-full flex flex-col gap-y-5' onSubmit={handleSubmit(login)}>
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
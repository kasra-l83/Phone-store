"use client"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./Input";
import { Schema } from "../utils/validation";
import { IMassege } from "../types/sendmassege";
import { RiSendPlaneFill } from "react-icons/ri";

export const MassegeForm: React.FC= () =>{
    const {handleSubmit, reset, control}= useForm<IMassege>({
        mode: "onSubmit",
        resolver: zodResolver(Schema)
    })

    const Submit= (data: IMassege) =>{
        console.log(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(Submit)} className="max-w-[500px] w-full space-y-5 rounded-2xl flex flex-col items-center">
            <span className="flex w-full justify-around gap-x-2">
                <Controller defaultValue="" name="fullName" control={control} render={({ field, fieldState }) =>(
                    <Input label="نام و نام خانوادگی" {...field} error={fieldState.error?.message}/>
                )}/>
                <Controller defaultValue="" name="subject" control={control} render={({ field, fieldState }) =>(
                    <Input label="موضوع" {...field} error={fieldState.error?.message}/>
                )}/>
            </span>
            <span className="flex w-full justify-around gap-x-2">
                <Controller name="phoneNumber" control={control} render={({ field, fieldState }) =>(
                    <Input label="تلفن تماس" {...field} error={fieldState.error?.message}/>
                )}/>
                <Controller defaultValue="" name="email" control={control} render={({ field, fieldState }) =>(
                    <Input label="ایمیل" {...field} error={fieldState.error?.message}/>
                )}/>
            </span>
            <label htmlFor="متن" className="text-lg font-light">متن پیام</label>
            <textarea id="متن" rows={3} cols={46} className= "border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
            <button type="submit" className="bg-blue-500 flex items-center gap-x-2 text-white hover:bg-blue-700 rounded-lg text-2xl font-bold py-1 px-8">ارسال<RiSendPlaneFill /></button>
        </form>
    )
}
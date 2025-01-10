"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { IUserPayment } from "@/types/payment";
import { fetchUserById } from "@/apis/users.api";
import { notFound } from "next/navigation";
import { paymentSchema } from "@/utils/validation";
import { Input } from "@/components/Input";


export default function Checkout() {
  const id = Cookies.get("userId");
  const router = useRouter();
  if(!id){
    return notFound();
  }

  const user = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id)
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserPayment>({
    resolver: zodResolver(paymentSchema),
    mode: "all",
    defaultValues: {
      firstname: `${user.data?.firstname}`,
      lastname: `${user.data?.lastname}`,
      phoneNumber: `${user.data?.phoneNumber}`,
      address: "",
      deliveryDate: ""
    }
  })

  React.useEffect(() => {
    if (user?.data) {
      reset({
        firstname: user.data.firstname,
        lastname: user.data.lastname,
        phoneNumber: user.data.phoneNumber
      })
    }
  }, [user.data, reset]);

  const submitHandler = (formData: IUserPayment) => {
    console.log("Form Submitted:", formData);
    router.push("/pay");
  }

  return (
    <div className="flex justify-center py-6 w-full rounded-lg">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="px-8 py-2 rounded-xl w-full max-w-md border border-blue-500"
      >
        <div className="space-y-3">
          <Controller name='firstname' control={control} render={({field, fieldState: {error}}) =>(
            <Input {...field} disabled={true} error={error?.message} label='نام'/>
          )}/>
          <Controller name='lastname' control={control} render={({field, fieldState: {error}}) =>(
            <Input {...field} disabled={true} error={error?.message} label='نام خانوادگی'/>
          )}/>
          <Controller name='phoneNumber' control={control} render={({field, fieldState: {error}}) =>(
            <Input {...field} disabled={true} error={error?.message} label='شماره موبایل'/>
          )}/>
          <Controller name='address' control={control} render={({field, fieldState: {error}}) =>(
            <Input {...field} error={error?.message} label='شهر'/>
          )}/>
          <div>
            <label htmlFor="deliveryDate" className="block text-gray-700 font-medium px-2">
              تاریخ تحویل
            </label>
            <Controller
              control={control}
              name="deliveryDate"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                inputClass="p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={value ? new DateObject(value) : ""}
                  onChange={(user) => {
                    const isoDate = user ? user.toDate().toISOString() : "";
                    onChange(isoDate);
                  }}
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  calendarPosition="bottom-right"
                  minDate={new Date()}
                />
              )}
            />
            {errors.deliveryDate && (
              <p className="text-red-500 text-sm px-2">{errors.deliveryDate.message}</p>
            )}
          </div>
          <div className="py-4">
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded">
              پرداخت
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
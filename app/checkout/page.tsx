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


export default function Checkout() {
  const id = Cookies.get("userId");
  const router = useRouter();
  if(!id){
    return notFound();
  }

  const user = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id)
  });
  console.log(user.data);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserPayment>({
    resolver: zodResolver(paymentSchema),
    mode: "all",
    defaultValues: {
      firstname: "",
      lastname: "",
      phoneNumber: "",
      address: "",
      deliveryDate: "",
    },
  });

  // Update form values when data is fetched
  React.useEffect(() => {
    if (user?.data?.user) {
      const users = user.data.user;
      reset({
        firstname: users.firstname || "",
        lastname: users.lastname || "",
        phoneNumber: users.phoneNumber || "",
        address: users.address || "",
        deliveryDate: "",
      });
    }
  }, [user, reset]);

  const submitHandler = (formData: IUserPayment) => {
    console.log("Form Submitted:", formData);
    Cookies.set("deliveryDate",formData.deliveryDate)
    router.push("/payment");
  }

  return (
    <div className="bg-checkout-pattern flex justify-center py-6 w-full rounded-lg">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-zinc-300 px-8 py-2 rounded-xl shadow-md w-full max-w-md opacity-90"
      >
        <div className="space-y-3">
          <div>
            <label htmlFor="firstname" className="block text-gray-700 font-medium px-2">
              نام
            </label>
            <input
              id="firstname"
              {...register("firstname")}
              className="w-full px-4 py-2 border rounded-md shadow-lg"
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm px-2">{errors.firstname.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastname" className="block text-gray-700 font-medium px-2">
              نام خانوادگی
            </label>
            <input
              id="lastname"
              {...register("lastname")}
              className="w-full px-4 py-2 border rounded-md shadow-lg"
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm px-2">{errors.lastname.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700 font-medium px-2">
              موبایل
            </label>
            <input
              id="phoneNumber"
              {...register("phoneNumber")}
              className="w-full px-4 py-2 border rounded-md shadow-lg"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm px-2">{errors.phoneNumber.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium px-2">
              آدرس
            </label>
            <textarea
              id="address"
              {...register("address")}
              rows={3}
              className="w-full px-4 py-2 border rounded-md shadow-lg"
            />
            {errors.address && (
              <p className="text-red-500 text-sm px-2">{errors.address.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="deliveryDate" className="block text-gray-700 font-medium px-2">
              تاریخ تحویل
            </label>
            <Controller
              control={control}
              name="deliveryDate"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                inputClass="p-2 rounded-lg shadow-lg"
                  value={value ? new DateObject(value) : ""}
                  onChange={(user) => {
                    const isoDate = user ? user.toDate().toISOString() : "";
                    onChange(isoDate);
                  }}
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  calendarPosition="bottom-right"
                />
              )}
            />
            {errors.deliveryDate && (
              <p className="text-red-500 text-sm px-2">{errors.deliveryDate.message}</p>
            )}
          </div>
          <div className="py-4">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              ادامه
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
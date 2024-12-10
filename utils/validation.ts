import { z } from "zod";

export type authSchemaType= z.infer<typeof authSchema>;

export const Schema= z.object({
  fullName: z
    .string()
    .min(5,"نام و نام خانوادگی باید حداقل 5 حرف باشد"),
    subject: z
    .string()
    .min(3, "موضوع باید حداقل 3 حرف باشد"),
  email: z
    .string()
    .refine(
      (value) => /\S+@\S+\.\S+/.test(value), "فرمت درست ایمیل را وارد کنید"
    ),
  phoneNumber: z
    .string()
    .refine(
      (value) => /[1-9]/g.test(value), "تلفن تماس باید فقط شامل اعداد باشند"
    )
    .refine(
      (value) => /^09/.test(value), "تلفن تماس باید با 09 شروع شوند"
    )
    .refine(
      (value) => /^09\d{9}$/.test(value), "شماره تماس باید 11 رقم باشد"
    )
})
export const authSchema = z.object({
  username: z.string().min(5, "نام کاربری باید حداقل 5 حرف باشد"),
  password: z.string().min(8, "رمز عبور باید حداقل 8 حرف باشد")
})
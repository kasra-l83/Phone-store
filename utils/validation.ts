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

const validSize= 100;
const validImageTypes= ["image/png", "image/jpeg", "image/jpg"];
export const imageValidator = (file: File | undefined, required = true) => {
  if (!required && !file) return undefined;
  if (!file) return "Image is required";
  if (!validImageTypes.includes(file.type)) {
    return `Image type must be ${validImageTypes.join(", ")}`;
  }
  if (validSize * Math.pow(10, 6) < file.size) {
    return `Image size must be lower then ${validSize}MB`;
  }
};

export const createProductSchema = z.object({
  category: z.string().nonempty("فیلد کتگوری نمی تواند خالی باشد"),
  subcategory: z.string().nonempty("فیلد ساب کتگوری نمی تواند خالی باشد"),
  name: z.string().min(5, "اسم کالا باید حداقل 5 حرف باشد"),
  price: z.string().refine(
    (value) => /[1-9]/g.test(value), "قیمت باید فقد شامل اعداد باشد"
  ),
  quantity: z.string().refine(
    (value) => /[1-9]/g.test(value), "تعداد باید فقد شامل اعداد باشد"
  ),
  brand: z.string().min(3, "برند کالا باید حداقل 3 حرف باشد"),
  description: z.string().min(10, "توضیحات محصول باید حداقل 10 حرف باشد")
})

export type createProductSchemaType = z.infer<typeof createProductSchema>;

export const createProductSchemaClient = z.object({
  category: z.string().nonempty("فیلد کتگوری نمی تواند خالی باشد"),
  subcategory: z.string().nonempty("فیلد ساب کتگوری نمی تواند خالی باشد"),
  name: z.string().min(5, "اسم کالا باید حداقل 5 حرف باشد"),
  price: z.string().refine(
    (value) => /[1-9]/g.test(value), "قیمت باید فقد شامل اعداد باشد"
  ),
  quantity: z.string().refine(
    (value) => /[1-9]/g.test(value), "تعداد باید فقد شامل اعداد باشد"
  ),
  brand: z.string().min(3, "برند کالا باید حداقل 3 حرف باشد"),
  description: z.string().min(10, "توضیحات محصول باید حداقل 10 حرف باشد"),
  images: z
    .any()
    .refine((file) => {
      return validImageTypes.includes(file?.type);
    }, `Image type must be ${validImageTypes.join(", ")}`)
    .refine((file) => {
      return validSize * Math.pow(10, 6) >= Number(file?.size || Infinity);
    }, `Image size must be lower then ${validSize}MB`)
})

export type createProductSchemaClientType = createProductSchemaType & {
  images: File;
}
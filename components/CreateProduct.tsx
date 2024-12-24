"use client";

import React from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../components/Input";
import { Textarea } from "./Textare";
import { Thumbnail } from "../components/Thumbnail";
import { errorHandler } from "../utils/errorHandler";
import { createProductSchemaClient, createProductSchemaClientType } from "../utils/validation";
import { createProduct, fetchCategoryList, fetchSubCategoryList } from "../apis/products.api";
import { useQuery } from "react-query";
import { ICategory, ISubCategory } from "@/types/product";

export const CreateProductForm: React.FC = () => {
  const [abortController, setAbortController]= React.useState<AbortController>();
  const categories= useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategoryList()
})
  const subCategories= useQuery({
      queryKey: ["subcategory"],
      queryFn: () => fetchSubCategoryList()
  })
  const createProductForm = useForm<createProductSchemaClientType>({
    mode: "all",
    resolver: zodResolver(createProductSchemaClient),
    defaultValues: {
      category: '',
      subcategory: '',
      brand: '',
      price: '',
      quantity: '',
      description: '',
      name: '',
      images: undefined
    }
  })

  const onSubmit = async (data: createProductSchemaClientType) =>{
    try {
      const formData = new FormData();
      formData.set("category", data.category);
      formData.set("subcategory", data.subcategory);
      formData.set("brand", data.brand);
      formData.set("name", data.name);
      formData.set("price", data.price);
      formData.set("quantity", data.quantity);
      formData.set("images", data.images);
      formData.set("description", data.description);
      const controller = new AbortController();
      setAbortController(controller);
      await createProduct(formData)
      toast.success("Created");
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  }

  return (
    <form onSubmit={createProductForm.handleSubmit(onSubmit)} className="rounded-lg bg-white absolute top-[-20px] z-30 sm:right-28 space-y-4 w-full sm:w-[500px] p-3">
      <Thumbnail name="images" control={createProductForm.control} />
      <span className="flex gap-x-2">
        <Controller name="name" control={createProductForm.control} render={({ field, fieldState: { error } }) =>
          (
            <Input {...field} error={error?.message} label="اسم"/>
          )}
        />
        <Controller name="brand" control={createProductForm.control} render={({ field, fieldState: { error } }) =>
          (
            <Input {...field} error={error?.message} label="برند"/>
          )}
        />
      </span>
      <span className="flex gap-x-2">
        <Controller name="category" control={createProductForm.control} render={({ field, fieldState: { error } }) =>
          (
            <select {...field} className="border py-1 rounded-lg w-full">
              <option>دیفالت</option>
              {categories.data?.map((category: ICategory) =>(
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          )}
        />
        <Controller name="subcategory" control={createProductForm.control} render={({ field, fieldState: { error } }) =>
          (
            <select {...field} className="border py-1 rounded-lg w-full">
              <option>دیفالت</option>
              {subCategories.data?.map((subCategory: ISubCategory) =>(
                <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
              ))}
            </select>
          )}
        />
      </span>
      <span className="flex gap-x-2">
        <Controller name="price" control={createProductForm.control} render={({ field, fieldState: { error } }) =>
          (
            <Input {...field} error={error?.message} label="قیمت"/>
          )}
        />
        <Controller name="quantity" control={createProductForm.control} render={({ field, fieldState: { error } }) =>
          (
            <Input {...field} error={error?.message} label="موجودی"/>
          )}
        />
      </span>
      <Controller name="description" control={createProductForm.control} render={({ field, fieldState: { error } }) =>
        (
          <Textarea {...field} error={error?.message} label="توضیحات"/>
        )}
      />
      <button type="submit" className="text-white text-sm rounded-md font-semibold py-2 px-1 w-full bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500">تأیید</button>
    </form>
  )
}
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
import {
  createProductSchemaClient,
  createProductSchemaClientType,
} from "../utils/validation";
import { createProduct } from "../apis/products.api";

export const CreateBlogForm: React.FC = () => {
  const [abortController, setAbortController] =
    React.useState<AbortController>();
  const createBlogForm = useForm<createProductSchemaClientType>({
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
      images: undefined,
    }
  })

  const onSubmit = async (data: createProductSchemaClientType) => {
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
    <form
      onSubmit={createBlogForm.handleSubmit(onSubmit)}
      className="space-y-4 mt-8"
    >
      <Thumbnail name="images" control={createBlogForm.control} />
      <Controller
        name="category"
        control={createBlogForm.control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            error={error?.message}
            label="category"
            placeholder="category"
          />
        )}
      />
      <Controller
        name="subcategory"
        control={createBlogForm.control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            error={error?.message}
            label="subcategory"
            placeholder="subcategory"
          />
        )}
      />
      <Controller
        name="brand"
        control={createBlogForm.control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            error={error?.message}
            label="brand"
            placeholder="brand"
          />
        )}
      />
      <Controller
        name="price"
        control={createBlogForm.control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            error={error?.message}
            label="price"
            placeholder="price"
          />
        )}
      />
      <Controller
        name="quantity"
        control={createBlogForm.control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            error={error?.message}
            label="quantity"
            placeholder="quantity"
          />
        )}
      />
      <Controller
        name="description"
        control={createBlogForm.control}
        render={({ field, fieldState: { error } }) => (
          <Textarea
            {...field}
            error={error?.message}
            label="description"
            placeholder="description"
          />
        )}
      />
      <Controller
        name="name"
        control={createBlogForm.control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            error={error?.message}
            label="name"
            placeholder="name"
          />
        )}
      />
      <button
        type="submit"
        className="text-white text-sm rounded-md font-semibold py-2 px-1 w-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-500"
      >
        Submit
      </button>
    </form>
  )
}
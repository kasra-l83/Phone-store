import { generateClient } from "./client";
import { urls } from "./urls";

export const fetchProductList= async (page: number, perPage: number) =>{
  const client= generateClient();
  const response= await client.get(urls.product.list(page, perPage))
  return response.data;
}
export const fetchProductById= async (id: string) =>{
  const client= generateClient();
  const response= await client.get(urls.product.byId(id))
  return response.data.data.product;
}
export const fetchCategoryList= async () =>{
  const client= generateClient();
  const response= await client.get(urls.category.list)
  return response.data?.data.categories;
}
export const fetchCategoryById= async (id: string) =>{
  const client= generateClient();
  const response= await client.get(urls.category.byId(id))
  return response.data?.data.category;
}
export const fetchSubCategoryList= async () =>{
  const client= generateClient();
  const response= await client.get(urls.subCategory.list)
  return response.data?.data.subcategories;
}
export const fetchSubCategoryById= async (id: string) =>{
  const client= generateClient();
  const response= await client.get(urls.subCategory.byId(id))
  return response.data?.data.subcategory;
}
export const deleteProduct= async (id: string) =>{
  const client= generateClient();
  const response= await client.delete(urls.product.delete(id))
  return response.data
}
export const createProduct= async (data: FormData) =>{
  const client= generateClient();
  const response= await client.post(urls.product.create, data, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.data;
}
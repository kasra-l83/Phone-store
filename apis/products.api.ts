import { generateClient } from "./client";
import { urls } from "./urls";

export const fetchProductList= async (page: number, perPage: number) =>{
  const client= generateClient();
  const response= await client.get(urls.product.list(page, perPage))
  return response.data;
}
export const fetchCategoryList= async () =>{
  const client= generateClient();
  const response= await client.get(urls.category.list)
  return response.data?.data.categories;
}
export const fetchSubCategoryList= async () =>{
  const client= generateClient();
  const response= await client.get(urls.subCategory.list)
  return response.data?.data.subcategories;
}
export const deleteProduct= async (id: string) =>{
  const client= generateClient();
  const response= await client.delete(urls.product.delete(id))
  return response.data
}
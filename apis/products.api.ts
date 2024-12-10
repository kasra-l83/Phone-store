import { generateClient } from "./client";
import { urls } from "./urls";

export const fetchProductList= async (page: number) =>{
  const client= generateClient();
  const response= await client.get(urls.product.list(page))
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
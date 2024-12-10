import { generateClient } from "./client";
import { urls } from "./urls";

export const fetchOrderList= async (page: number) =>{
  const client= generateClient();
  const response= await client.get(urls.order.list(page))
  return response.data;
}
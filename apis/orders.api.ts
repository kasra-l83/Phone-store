import { generateClient } from "./client";
import { urls } from "./urls";

export const fetchOrdersList= async () =>{
  const client= generateClient();
  const response= await client.get(urls.orders.list)
  return response.data;
}
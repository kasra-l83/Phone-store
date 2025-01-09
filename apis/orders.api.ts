import { generateClient } from "./client";
import { urls } from "./urls";

export const fetchOrderList= async (page: number) =>{
  const client= generateClient();
  const response= await client.get(urls.order.list(page))
  return response.data;
}
export const fetchOrderById= async (id: string) =>{
  const client= generateClient();
  const response= await client.get(urls.order.byId(id))
  return response.data;
}
export const updateOrder= async (id: string) =>{
  const client= generateClient();
  const response= await client.patch(urls.order.byId(id), {
    "deliveryStatus": true,
    "deliveryDate": `${Date.now()}`
  })
  return response.data;
}
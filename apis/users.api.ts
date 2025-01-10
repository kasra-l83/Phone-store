import { ILogin, ISignup } from "@/types/users";
import { generateClient } from "./client";
import { urls } from "./urls";
import Cookies from "js-cookie";

export const fetchUserList= async () =>{
  const client= generateClient();
  const response= await client.get(urls.user.list, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.data.data.users;
}
export const fetchUserById= async (id: string) =>{
  const client= generateClient();
  const response= await client.get(urls.user.byId(id))
  return response.data?.data.user;
}
export const login = async (body: ILogin) => {
  const client = generateClient();
  const response = await client.post(urls.user.login, body);
  const { _id } = response.data.data.user;
  Cookies.set("userId", _id);
  return response.data;
}
export const signup = async (body: ISignup) => {
  const client = generateClient();
  const response = await client.post(urls.user.signup, body);
  return response.data;
}
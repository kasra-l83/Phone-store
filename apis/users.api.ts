import { generateClient } from "./client";
import { urls } from "./urls";

export const fetchUserList= async () =>{
  const client= generateClient();
  const response= await client.get(urls.user.list, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.data.data.users;
}
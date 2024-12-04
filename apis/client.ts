import axios from "axios";

const serverUrl= "http://localhost:8000/api";

export const generateClient= () =>{
  return axios.create({
    baseURL: serverUrl
  })
}
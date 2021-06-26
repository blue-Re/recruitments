import axios from "axios";

export default function ajax(config){
  const instance = axios.create({
    baseURL:'http://localhost:3000',
    timeout:5000,
    withCredentials:'include'
  })
  return instance(config)
}

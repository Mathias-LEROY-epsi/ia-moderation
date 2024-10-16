import axios from "axios";
import { Message } from "@/types";

export async function getAMessage({ id }: Message) {
  return await axios.get(`${import.meta.env.VITE_BASE_URL}/${id}`).then(res => {
    return res.data;
  });
}

export async function getAllMessages() {
  return await axios.get(`${import.meta.env.VITE_BASE_URL}`).then(res => {
    return res.data;
  });
}

import axios from "axios";

export async function editAMessage({ id, visible, reasons }: { id: string; visible: boolean; reasons?: string[] }) {
  return await axios.put(`${import.meta.env.VITE_BASE_URL}/${id}`, { visible, reasons }).then(res => {
    return res.data;
  });
}

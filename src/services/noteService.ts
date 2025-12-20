import axios from "axios";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// api.get("/notes");
export const fetchNotes = async (page: number, search: string) => {
  const { data } = await api.get("/notes", {
    params: {
      page,
      search,
    },
  });

  return data;
};







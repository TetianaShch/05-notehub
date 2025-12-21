import axios from "axios";
import type { Note } from "../types/note";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export interface FetchNotesParams {
  page?: number;
  search?: string;
}

interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const { data } = await api.post("/notes", payload);
  return data;
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// api.get("/notes");
export const fetchNotes = async ({
  page = 1,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: { page, search },
  });

  return data;
};


export const deleteNote = async (id: string) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};







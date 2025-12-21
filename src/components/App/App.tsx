import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import { deleteNote } from "../../services/noteService";
import { useState } from "react";

import css from "./App.module.css";

export default function App() {
  const { data } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(1, ""),
  });

  const notes = data?.notes ?? data ?? [];
  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox />
        <button type="button" className={css.button} onClick={openModal}>
          Create note +
        </button>
      </div>

      {notes.length > 0 && (
        <NoteList notes={notes} onDelete={(id) => deleteMutation.mutate(id)} />
      )}

      <Pagination />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm
            onCancel={closeModal}
            onSubmit={(values) => createNoteMutation.mutate(values)}
          />
        </Modal>
      )}
    </div>
  );
}

import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";


import css from "./App.module.css";


export default function App() {

  const { data } = useQuery({
  queryKey: ["notes"],
  queryFn: () => fetchNotes(1, ""),
  });

  const notes = data?.notes ?? data ?? [];


  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox />
        <button type="button" className={css.button}>
          Create note +
        </button>
      </div>

      <NoteForm />
      {notes.length > 0 && <NoteList notes={notes} />}

      <Pagination />
      <Modal />
    </div>
  );
}





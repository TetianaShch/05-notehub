import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";

import css from "./App.module.css";

export default function App() {
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <h1>NoteHub</h1>
        <button type="button" className={css.button}>
          Create note +
        </button>
      </div>

      <NoteForm />
      <SearchBox />
      <NoteList />
      <Pagination />
      <Modal />
    </div>
  );
}





import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "./hooks/useLocalStorage";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import FilterBar from "./components/FilterBar";
import "./components/Style.css";

interface Note {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
}

const App: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [activeCategory, setActiveCategory] = useState("All");
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  const addNote = (title: string, category: string, content: string) => {
    const newNote: Note = {
      id: uuidv4(),
      title,
      category,
      content,
      date: new Date().toLocaleString(),
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, title: string, category: string, content: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, title, category, content, date: new Date().toLocaleString() }
          : note
      )
    );
    setNoteToEdit(null);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const categories = Array.from(new Set(notes.map((note) => note.category)));
  const filteredNotes = activeCategory === "All" ? notes : notes.filter((note) => note.category === activeCategory);

  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <div className="sidebar">
          <NoteForm
            addNote={addNote}
            editNote={noteToEdit}
            updateNote={updateNote}
            cancelEdit={() => setNoteToEdit(null)}
          />
        </div>
        <div className="content">
          <FilterBar
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <NoteList
            notes={filteredNotes}
            deleteNote={deleteNote}
            editNote={(note) => setNoteToEdit(note)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;

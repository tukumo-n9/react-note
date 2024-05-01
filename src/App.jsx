import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [selectedNoteId, setSelectedNoteId] = useState("");
  const getSelectedNote = () => {
    return notes.find((note) => note.id === selectedNoteId);
  };
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    if (!selectedNoteId && notes.length) {
      setSelectedNoteId(notes[0].id);
    }
  }, []);
  return (
    <>
      <Sidebar
        notes={notes}
        setNotes={setNotes}
        selectedNoteId={selectedNoteId}
        setSelectedNoteId={setSelectedNoteId}
      />
      <Main
        selectedNote={getSelectedNote()}
        notes={notes}
        setNotes={setNotes}
      />
    </>
  );
}

export default App;

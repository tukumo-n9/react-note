import { useEffect, useState } from "react";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
  type Note = {
    id: string;
    title: string;
    content: string;
    date: number;
  };

  type Notes = Note[] | [];

  type GetSelectedNote = () => Note | undefined;

  const [notes, setNotes] = useState<Notes>(
    JSON.parse(localStorage.getItem("notes") ?? "[]")
  );
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  const getSelectedNote: GetSelectedNote = (): Note | undefined => {
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
    <div className="container flex">
      <Sidebar
        notes={notes}
        setNotes={setNotes}
        setSelectedNoteId={setSelectedNoteId}
      />
      <Main
        selectedNote={getSelectedNote()}
        notes={notes}
        setNotes={setNotes}
      />
    </div>
  );
}

export default App;

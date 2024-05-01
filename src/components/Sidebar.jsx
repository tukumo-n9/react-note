import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./Sidebar.css";

function Sidebar({ notes, setNotes, setSelectedNoteId }) {
  const onAddNote = () => {
    setNotes([
      ...notes,
      {
        id: uuid(),
        title: "タイトル",
        content: "内容",
        date: Date.now(),
      },
    ]);
  };

  const onDeleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  // useEffect(() => {
  //   console.log(notes);
  // }, [notes]);

  // useEffect(() => {
  //   console.log(selectedNoteId);
  // });

  const sortedNotes = notes.sort((a, b) => {
    return b.date - a.date;
  });

  return (
    <div className="sidebar">
      <h1>ノート</h1>
      <button type="button" onClick={onAddNote}>
        追加
      </button>
      <ul>
        {sortedNotes.map((note) => {
          return (
            <li key={note.id}>
              <button type="button" onClick={() => setSelectedNoteId(note.id)}>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <p>
                  {new Date(note.date).toLocaleDateString("ja-JP", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </button>
              <button type="button" onClick={() => onDeleteNote(note.id)}>
                削除
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;

import { v4 as uuid } from "uuid";

type Props = {
  notes: {
    id: string;
    title: string;
    content: string;
    date: number;
  }[];
  setNotes: (
    notes: {
      id: string;
      title: string;
      content: string;
      date: number;
    }[]
  ) => void;
  setSelectedNoteId: (id: string) => void;
};

function Sidebar({ notes, setNotes, setSelectedNoteId }: Props) {
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

  const onDeleteNote = (id: string) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const sortedNotes = notes.sort((a, b) => {
    return b.date - a.date;
  });

  return (
    <div className="basis-1/5">
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

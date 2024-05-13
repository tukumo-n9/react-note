import Markdown from "react-markdown";

type Props = {
  selectedNote:
    | {
        id: string;
        title: string;
        content: string;
        date: number;
      }
    | undefined;
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
};

function Main({ selectedNote, notes, setNotes }: Props) {
  const onEditNote = (key: string, value: string) => {
    if (!selectedNote) {
      return;
    }
    const newNote = {
      ...selectedNote,
      [key]: value,
      date: Date.now(),
    };
    const newNotes = notes.map((note) =>
      note.id === selectedNote.id ? newNote : note
    );
    setNotes(newNotes);
  };
  return (
    <main className="basis-4/5">
      {!selectedNote ? (
        <p>選択されていません</p>
      ) : (
        <>
          <div>
            <label htmlFor="title">タイトル</label>
            <input
              type="text"
              id="title"
              value={selectedNote.title}
              onChange={(e) => onEditNote("title", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="content">内容</label>
            <textarea
              id="content"
              value={selectedNote.content}
              onChange={(e) => onEditNote("content", e.target.value)}
            />
          </div>
          <div>
            <h2>{selectedNote.title}</h2>
            <Markdown>{selectedNote.content}</Markdown>
          </div>
        </>
      )}
    </main>
  );
}

export default Main;

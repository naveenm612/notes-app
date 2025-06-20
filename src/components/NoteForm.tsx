import { useState, useEffect } from "react";

interface Note {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
}

interface NoteFormProps {
  addNote: (title: string, category: string, content: string) => void;
  editNote: Note | null;
  updateNote: (id: string, title: string, category: string, content: string) => void;
  cancelEdit: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ addNote, editNote, updateNote, cancelEdit }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setCategory(editNote.category);
      setContent(editNote.content);
    }
  }, [editNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && category.trim() && content.trim()) {
      if (editNote) {
        updateNote(editNote.id, title, category, content);
      } else {
        addNote(title, category, content);
      }
      setTitle("");
      setCategory("");
      setContent("");
    }
  };

  return (
    <div>
      <h3>{editNote ? "Edit Note" : "Create New Note"}</h3>
      <form onSubmit={handleSubmit} className="note-form">
        <div>
          <h4>Category</h4>
          <input
            type="text"
            placeholder="e.g., Personal, Work, Ideas..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <h4>Title</h4>
          <input
            type="text"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <h4>Content</h4>
          <textarea
            placeholder="Write your note content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editNote ? "Update Note" : "Add Note"}</button>
        {editNote && <button type="button" onClick={cancelEdit}>Cancel</button>}
      </form>
    </div>
  );
};

export default NoteForm;

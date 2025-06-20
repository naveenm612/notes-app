interface Note {
    id: string;
    title: string;
    category: string;
    content: string;
    date: string;
}

interface NoteListProps {
    notes: Note[];
    deleteNote: (id: string) => void;
    editNote: (note: Note) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, deleteNote, editNote }) => (
    <div className="note-list">
        {notes.map((note) => (
            <div key={note.id} className="note-card">
                <h3>{note.title}</h3>
                <span className="note-category">{note.category}</span>
                <p className="note-date">{note.date}</p>
                <p>{note.content}</p>
                
                <button
                   className="note-delete"
                    onClick={() => deleteNote(note.id)}>
                    Delete</button>
                <button className="note-edit"
                    onClick={() => editNote(note)}>Edit</button>
            </div>
        ))}
    </div>
);

export default NoteList;

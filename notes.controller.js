const fs = require("fs/promises");
const path = require("path");

const notesPath = path.join(__dirname, "db.json");
console.log(notesPath);

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}
async function removeItem(id) {
  const notes = await getNotes();

  const updateNotes = notes.filter((item) => item.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(updateNotes));
  return;
}

async function editNotes(noteId, newTitle) {
  const notes = await getNotes();
  const newNotes = notes.map((note) =>
    noteId === note.id ? { ...note, title: newTitle } : note
  );
  await fs.writeFile(notesPath, JSON.stringify(newNotes));

  return;
}
module.exports = {
  addNote,
  getNotes,
  removeItem,
  editNotes,
};

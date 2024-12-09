const yargs = require("yargs");

const {
  addNote,
  getNotes,
  removeItem,
  editNotes,
} = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    console.log("Add command", title);
    addNote(title);
  },
});
yargs.command({
  command: "list",
  describe: "Prints all list",
  async handler() {
    const notes = await getNotes();
    const newNotes = notes.forEach(({ title, id }) => console.log(id, title));
    return newNotes;
  },
});
yargs.command({
  command: "remove",
  describe: "Remove note by id",
  builder: {
    id: {
      type: "string",
      describe: "remove note",
      demandOption: true,
    },
  },
  async handler({ id }) {
    removeItem(id);
  },
});

yargs.command({
  command: "edit",
  describe: "Edit note by id",
  builder: {
    title: {
      describe: "Title of the item",
      demandOption: true,
      type: "string",
    },
    id: {
      describe: "Id of the item",
      demandOption: true,
      type: "string",
    },
  },
  async handler({ id, title }) {
    await editNotes(id, title);
  },
});

yargs.parse();

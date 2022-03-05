const { default: chalk } = require("chalk");
const fs = require("fs");

const getNotes = function (text) {
  return text;
};

const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.blueBright.inverse("Note title taken!"));
  }
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const removeNote = function (title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.bgGreen.inverse("Note removed!"));
  } else {
    console.log(chalk.bgRed.bold.inverse("No note found!"));
  }
};

const listNotes = function () {
  const notes = loadNotes();
  console.log(`Printing ${notes.length} note(s).`);
  notes.forEach((note) => console.log(note.title));
};

module.exports = {
  getNotes,
  addNote,
  removeNote,
  saveNotes,
  loadNotes,
  listNotes,
};

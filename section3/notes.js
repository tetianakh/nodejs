const fs = require('fs');

const FNAME = 'notes-data.json';

const fetchNotes = () => {
  let notes = [];
  try {
    notes = JSON.parse(fs.readFileSync(FNAME));
  } catch (e) {  }
  return notes;
};

const saveNotes = (notes) => {
    fs.writeFileSync(FNAME, JSON.stringify(notes));
};

let addNote = (title, body) => {
  const notes = fetchNotes();
  const note = {title, body};
  let duplicateNotes = notes.filter((n) => n.title === title);
  if (duplicateNotes.length == 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
  return null;
};

let getAll = () => {
  return fetchNotes();
};

let getNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title === title);
  if (filteredNotes.length === 0) {
    return null;
  }
  return filteredNotes[0];
};

let removeNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
};

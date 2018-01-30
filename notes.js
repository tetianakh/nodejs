const fs = require('fs');

const FNAME = 'notes-data.json';

let addNote = (title, body) => {
  let notes = [];
  try {
    notes = JSON.parse(fs.readFileSync(FNAME));
  } catch (e) {  }
  let duplicateNotes = notes.filter((n) => n.title === title);
  if (duplicateNotes.length > 0){
    console.log('A note with this title already exists!')
  } else {
    const note = {
      title, body
    };
    notes.push(note);
    fs.writeFileSync(FNAME, JSON.stringify(notes));
  }

};

let getAll = () => {
  console.log('Returning all notes');
};

let getNote = (title) => {
  console.log("Returning note ", title);
};

let removeNote = (title) => {
  console.log("Removing note", title);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
};

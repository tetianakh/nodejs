let addNote = (title, body) => {
  console.log("Adding note", title, body);
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

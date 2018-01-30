const fs = require('fs');

const note = {title: 'Test title', body: "Once upon a time..."};

const noteStr = JSON.stringify(note);

fs.writeFileSync('notes.json', noteStr);

const readNote = JSON.parse(fs.readFileSync('notes.json'));
console.log(readNote);
console.log(typeof readNote);

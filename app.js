
const fs = require('fs');
const yargs = require('yargs');
const _ = require('lodash');

const notes = require('./notes');

const command = yargs.argv._[0];

if (command === 'list') {
  notes.getAll();
} else if (command === 'add') {
  notes.addNote(yargs.argv.title, yargs.argv.body);
} else if (command === 'read') {
  notes.getNote(yargs.argv.title);
} else if (command === 'remove'){
  notes.removeNote(yargs.argv.title);
} else {
  console.log("Command not recognised!");
}

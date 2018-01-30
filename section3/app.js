
const fs = require('fs');
const yargs = require('yargs');
const _ = require('lodash');

const notes = require('./notes');

const titleOptions ={demand: true, describe: 'Note title', alias: 't'};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: {demand: true, describe: 'Note body', alias: 'b'},
  })
  .command('list', 'List all notes')
  .command('read', 'Display a note', {
    title: titleOptions,
  })
  .command('remove', 'Remove a note', {
    title: titleOptions,
  })
  .help()
  .argv;

const command = argv._[0];

const logNote = note => {
  console.log('--------------------')
  console.log(`Title:\t ${note.title}`);
  console.log(`Body:\t ${note.body}`);
}

if (command === 'list') {
  const allNotes = notes.getAll();
  const suffix = allNotes.length % 10 === 1 ? '' : 's';
  const ending = allNotes.length === 0? '.' : ':';
  console.log(`[Info] Found ${allNotes.length} note${suffix}${ending}`);
  allNotes.forEach(note => logNote(note));
} else if (command === 'add') {
  const note = notes.addNote(yargs.argv.title, yargs.argv.body);
  if (note !== null) {
    console.log('[Info] A note was added:');
    logNote(note);
  } else {
    console.log('[Error] This title is already in use!')
  }
} else if (command === 'read') {
  const note = notes.getNote(yargs.argv.title);
  if (note !== null) {
    logNote(note);
  } else {
    console.log('[Error] Note was not found.')
  }
} else if (command === 'remove'){
  const noteRemoved = notes.removeNote(yargs.argv.title);
  if (noteRemoved) {
    console.log("[Info] The note was removed successfully.")
  } else {
    console.log("[Info] Nothing to remove: note with this title does not exists.")
  }
} else {
  console.log("Command not recognised!");
}

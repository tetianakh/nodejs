console.log('Main module');

const notes = require('./notes');
const os = require('os');
const fs = require('fs');
const _ = require('lodash');

const name = os.userInfo().username;

fs.appendFileSync('hello.log', `I am ${name} and I am ${notes.age} years old.\n`);

const arr = [1, 2, 1, 3, 2];
console.log(arr);
console.log(_.uniq(arr));

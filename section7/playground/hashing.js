const {SHA256} = require('crypto-js');


const message = '';
console.log(SHA256(message).toString());

console.log(SHA256(0).toString());

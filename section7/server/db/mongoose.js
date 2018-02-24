const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const mongodb = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';
mongoose.connect(mongodb);

module.exports = {mongoose};

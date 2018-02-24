const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const mongodb = process.env.MONGODB_URI;
mongoose.connect(mongodb);

module.exports = {mongoose};

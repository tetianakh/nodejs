const { MongoClient, ObjectID } = require('mongodb');

const {User} = require('../server/models/user');


// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
//   if (err) {
//     return console.log('Unable to connect to MongoDB server');
//   }
//   console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'something to do',
  //   completed: false,
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert a todo item:', err)
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // });

  // db.collection('Todos')
  //   .find({_id: new ObjectID("5a7f795b02833a056d3c4332")})
  //   .toArray()
  //   .then((docs) => {
  //     console.log('Todo:');
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   }, (err) => {
  //     console.log('Failed to fetch Todo documents');
  //   });

//   db.collection('Todos').find().count()
//     .then((count) => {
//       console.log(`Count: ${count}`);
//     }).catch((err) => {
//       return console.log('Failed to count elements')
//     });
//
//   db.close();
// });

const id = '5a80af7b987d5008681eff8f';

User.findById(id).then(doc => {
  if (!doc) {
    return console.log('User not found')
  };
  console.log('User:', doc)
}).catch(err => console.log(err));

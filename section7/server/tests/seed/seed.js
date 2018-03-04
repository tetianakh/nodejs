const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {User} = require('../../models/user');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'andrew@example.com',
  password: 'userOnePass',
  tokens: [
    {
      access: 'auth',
      token: jwt.sign({_id: userOneId.toHexString(), access: 'auth'}, 'abc123'),
    },
  ]
},
{
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTwoPass',
}
]

const populateUsers = (done) => {
  User.remove({}).then( () => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo])
  }).then(() => done());
};


module.exports = {populateUsers, users};

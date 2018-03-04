const {mongoose} = require('../db/mongoose');
const validator = require('validator');
const jwt =  require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  tokens: [{
    access: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      require: true,
    }
  }]
});

// instance methods
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObj = user.toObject();
  return _.pick(userObj, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123');
  user.tokens.push({access, token});
  return user.save().then( () => {
    return token;
  })
};

// model methods

UserSchema.statics.findByToken = function (token) {
  const User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  };
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
}

// middleware

UserSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
})

const User = mongoose.model('User', UserSchema);



module.exports = {User};

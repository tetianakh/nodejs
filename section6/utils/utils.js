module.exports.add = (a, b) => a + b;


module.exports.setName = (user, fullName) => {
  const names = fullName.split(' ');
  user.firstName = names[0];
  user.lastName = names[names.length - 1];
  return user;
}

module.exports.asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b)
  }, 1000)
};

module.exports.asyncSquare = (a, callback) => {
  setTimeout(() => {
    callback(a * a)
  }, 100)
};

const utils = require('./utils');
const expect = require('expect');


it('should add two numbers', () => {
  const res = utils.add(11, 12);
  expect(res).toBe(23).toBeA('number');
})


it('should async add two numbers', (done) => {
  utils.asyncAdd(3, 4, (result) => {
    expect(result).toBe(7);
    done();
  });
});

it('should async square a number', (done) => {
  utils.asyncSquare(4, (result) => {
    expect(result).toBe(16).toBeA('number');
    done();
  });
});

it('should set first and last name', () => {
  const user = {age: 28};
  utils.setName(user, 'Foka Fokaccio');
  expect(user).toInclude({firstName: 'Foka', lastName: 'Fokaccio'});
})

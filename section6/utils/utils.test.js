const utils = require('./utils');


it('should add two numbers', () => {
  const res = utils.add(11, 12);
  if (res !== 23 ){
    throw new Error(`Expected 23, got ${res} instead`)
  }
})

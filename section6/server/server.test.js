const request = require('supertest');
const expect = require('expect');

const app = require('./server').app;



describe('Server', () => {
  describe('#index', () => {
    it('should return a greeting', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect((res) => {
          // custom assertions about response here
          expect(res.body).toInclude({error: 'Page not found.'})
        })
        .end(done);
    });
  });

  describe('#users', () => {

    it('should return foka', (done) => {
        request(app)
          .get('/users')
          .expect(200)
          .expect((res) => {
            expect(res.body).toInclude({name: 'Foka', age: 28})
          })
          .end(done);
    });
  });
});

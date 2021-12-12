const app = require('../app');
const supertest = require('supertest');

it('Gets a non-existent endpoint', async () => {
  await supertest(app)
    .get('/api')
    .expect(404)
    .then((response) => {
      expect(response.body.error.message).toBe('Not Found');
    });
});

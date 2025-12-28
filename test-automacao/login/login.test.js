const { expect } = require('chai');
const { getApi } = require('../utils');
const logins = require('../fixtures/login.json');

describe('Login de Usuários', () => {
  logins.forEach((login) => {
    it(`Deve fazer login de ${login.email}`, async () => {
      const res = await getApi()
        .post('/api/auth/login')
        .send(login);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('user');
      expect(res.body).to.have.property('token');
    });
  });
});

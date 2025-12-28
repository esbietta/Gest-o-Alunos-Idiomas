const { expect } = require('chai');
const { getApi } = require('../utils');
const usuarios = require('../fixtures/usuarios.json');

describe('Registro de Usuários', () => {
  usuarios.forEach((usuario) => {
    it(`Deve registrar ${usuario.tipo} com sucesso`, async () => {
      const res = await getApi()
        .post('/api/auth/register')
        .send(usuario);
      expect(res.status).to.be.oneOf([201, 409]); // 409 se já existir
      if (res.status === 201) {
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.include({ nome: usuario.nome, email: usuario.email, tipo: usuario.tipo });
        expect(res.body).to.have.property('token');
      }
    });
  });
});

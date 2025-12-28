const { expect } = require('chai');
const { getApi } = require('../utils');
const cursos = require('../fixtures/cursos.json');
const logins = require('../fixtures/login.json');

let tokenProfessor;

describe('Gestão de Cursos', () => {
  before(async () => {
    // Login como professor
    const res = await getApi().post('/api/auth/login').send(logins[1]);
    tokenProfessor = res.body.token;
  });

  cursos.forEach((curso) => {
    it(`Deve criar curso: ${curso.nome}`, async () => {
      const res = await getApi()
        .post('/api/cursos')
        .set('Authorization', `Bearer ${tokenProfessor}`)
        .send(curso);
      expect(res.status).to.be.oneOf([201, 409]);
      if (res.status === 201) {
        expect(res.body).to.include({ nome: curso.nome, idioma: curso.idioma, nivel: curso.nivel });
      }
    });
  });

  it('Deve listar cursos', async () => {
    const res = await getApi()
      .get('/api/cursos')
      .set('Authorization', `Bearer ${tokenProfessor}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});

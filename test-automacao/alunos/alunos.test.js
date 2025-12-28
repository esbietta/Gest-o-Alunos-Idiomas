const { expect } = require('chai');
const { getApi } = require('../utils');
const logins = require('../fixtures/login.json');

let tokenAluno, tokenProfessor, cursoId;

describe('Inscrição e Listagem de Alunos', () => {
  before(async () => {
    // Login como aluno e professor
    const resAluno = await getApi().post('/api/auth/login').send(logins[0]);
    tokenAluno = resAluno.body.token;
    const resProf = await getApi().post('/api/auth/login').send(logins[1]);
    tokenProfessor = resProf.body.token;
    // Buscar um curso existente
    const resCursos = await getApi().get('/api/cursos').set('Authorization', `Bearer ${tokenProfessor}`);
    cursoId = resCursos.body[0]?.id;
  });

  it('Deve inscrever aluno em curso', async () => {
    const res = await getApi()
      .post('/api/alunos/inscrever')
      .set('Authorization', `Bearer ${tokenAluno}`)
      .send({ cursoId });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('curso');
  });

  it('Professor deve listar alunos inscritos', async () => {
    const res = await getApi()
      .get('/api/alunos')
      .set('Authorization', `Bearer ${tokenProfessor}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('nome');
    expect(res.body[0]).to.have.property('cursos');
  });
});

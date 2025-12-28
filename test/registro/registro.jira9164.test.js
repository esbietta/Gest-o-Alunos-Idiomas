const { expect } = require('chai');
const { getApi } = require('../utils');
const usuarios = require('../fixtures/usuarios.json');
require('dotenv').config();

describe('JIRA-9164: Registro de Usuários (Professor/Aluno)', () => {
  it('1. Registrar usuário com dados válidos', async () => {
    const timestamp = Date.now();
    const usuario = {
      nome: `Aluno Teste ${timestamp}`,
      email: `aluno${timestamp}@teste.com`,
      senha: 'senha1234',
      tipo: 'aluno'
    };
    const res = await getApi().post('/api/auth/register').send(usuario);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('user');
    expect(res.body.user).to.include({ nome: usuario.nome, email: usuario.email, tipo: usuario.tipo });
    expect(res.body).to.have.property('token');
  });

  it('2. Registrar usuário com dados inválidos ou incompletos', async () => {
    const res = await getApi().post('/api/auth/register').send({ nome: '', email: '', senha: '', tipo: '' });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('3. Registrar usuário com e-mail duplicado', async () => {
    const usuario = usuarios[0];
    await getApi().post('/api/auth/register').send(usuario); // registra
    const res = await getApi().post('/api/auth/register').send(usuario); // tenta duplicar
    expect(res.status).to.equal(409);
    expect(res.body).to.have.property('error');
  });

  it('4. Registrar usuário com tipo de perfil inválido', async () => {
    const usuario = {
      nome: 'Usuário Inválido',
      email: `invalido${Date.now()}@teste.com`,
      senha: 'senha1234',
      tipo: 'admin'
    };
    const res = await getApi().post('/api/auth/register').send(usuario);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('6. Validar geração de token JWT após registro bem-sucedido', async () => {
    const usuario = {
      nome: `Aluno Token ${Date.now()}`,
      email: `token${Date.now()}@teste.com`,
      senha: 'senha1234',
      tipo: 'aluno'
    };
    const res = await getApi().post('/api/auth/register').send(usuario);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('token');
    expect(res.body.token).to.be.a('string');
  });
});

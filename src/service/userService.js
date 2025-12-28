const db = require('../model/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

function findUserByEmail(email) {
  return db.users.find(u => u.email === email);
}

function registerUser({ nome, email, senha, tipo }) {
  if (!nome || !email || !senha || !tipo) throw { status: 400, message: 'Campos obrigatórios faltando.' };
  if (tipo !== 'aluno' && tipo !== 'professor') throw { status: 400, message: 'Tipo de usuário inválido.' };
  if (senha.length < 8) throw { status: 400, message: 'Senha deve ter no mínimo 8 caracteres.' };
  if (findUserByEmail(email)) throw { status: 409, message: 'E-mail já cadastrado.' };
  const senhaHash = bcrypt.hashSync(senha, 8);
  const user = { id: db.users.length + 1, nome, email, senhaHash, tipo, cursos: [] };
  db.users.push(user);
  const token = jwt.sign({ id: user.id, tipo: user.tipo }, JWT_SECRET, { expiresIn: '1h' });
  return { user: { id: user.id, nome: user.nome, email: user.email, tipo: user.tipo }, token };
}

function loginUser({ email, senha }) {
  const user = findUserByEmail(email);
  if (!user) throw { status: 401, message: 'E-mail ou senha inválidos.' };
  if (!bcrypt.compareSync(senha, user.senhaHash)) throw { status: 401, message: 'E-mail ou senha inválidos.' };
  const token = jwt.sign({ id: user.id, tipo: user.tipo }, JWT_SECRET, { expiresIn: '1h' });
  return { user: { id: user.id, nome: user.nome, email: user.email, tipo: user.tipo }, token };
}

module.exports = { registerUser, loginUser, findUserByEmail };

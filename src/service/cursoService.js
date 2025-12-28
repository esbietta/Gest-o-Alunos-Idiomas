const db = require('../model/database');

function criarCurso({ nome, idioma, nivel, descricao, professorId }) {
  if (!nome || !idioma || !nivel || !descricao) throw { status: 400, message: 'Campos obrigatórios faltando.' };
  if (db.cursos.find(c => c.nome === nome && c.idioma === idioma)) throw { status: 409, message: 'Já existe um curso com esse nome e idioma.' };
  const curso = { id: db.cursos.length + 1, nome, idioma, nivel, descricao, professorId, alunos: [] };
  db.cursos.push(curso);
  return curso;
}

function listarCursos({ user }) {
  if (user.tipo === 'professor') {
    return db.cursos.filter(c => c.professorId === user.id);
  }
  return db.cursos;
}

function matricularAluno({ alunoId, cursoId }) {
  const curso = db.cursos.find(c => c.id === cursoId);
  if (!curso) throw { status: 404, message: 'Curso não encontrado.' };
  if (!curso.alunos.includes(alunoId)) curso.alunos.push(alunoId);
  return curso;
}

module.exports = { criarCurso, listarCursos, matricularAluno };

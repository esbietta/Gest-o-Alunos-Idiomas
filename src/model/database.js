// Banco de dados em memória
const db = {
  users: [], // { id, nome, email, senhaHash, tipo: 'aluno'|'professor', cursos: [cursoId] }
  cursos: [], // { id, nome, idioma, nivel, descricao, professorId, alunos: [userId] }
  matriculas: [] // { id, alunoId, cursoId, status }
};

module.exports = db;

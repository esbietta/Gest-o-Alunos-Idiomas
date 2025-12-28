const db = require('../model/database');

function listarAlunos({ user, filtroCurso, filtroIdioma }) {
  if (user.tipo !== 'professor') throw { status: 403, message: 'Apenas professores podem listar alunos.' };
  // Lista todos os alunos inscritos em pelo menos um curso
  let alunos = db.users.filter(u => u.tipo === 'aluno' && u.cursos.length > 0);
  if (filtroCurso) {
    alunos = alunos.filter(a => a.cursos.includes(Number(filtroCurso)));
  }
  if (filtroIdioma) {
    alunos = alunos.filter(a => {
      return a.cursos.some(cid => {
        const curso = db.cursos.find(c => c.id === cid);
        return curso && curso.idioma === filtroIdioma;
      });
    });
  }
  // Para cada aluno, mostrar nome e cursos em que está inscrito
  return alunos.map(a => {
    const cursos = a.cursos.map(cid => {
      const curso = db.cursos.find(c => c.id === cid);
      return curso ? { id: curso.id, nome: curso.nome, idioma: curso.idioma, status: 'matriculado' } : null;
    }).filter(Boolean);
    return { nome: a.nome, cursos };
  });
}

function perfilAluno({ user }) {
  if (user.tipo !== 'aluno') throw { status: 403, message: 'Apenas alunos podem acessar o próprio perfil.' };
  const cursos = user.cursos.map(cid => {
    const curso = db.cursos.find(c => c.id === cid);
    return curso ? { nome: curso.nome, idioma: curso.idioma, status: 'matriculado' } : null;
  }).filter(Boolean);
  return { nome: user.nome, cursos };
}

module.exports = { listarAlunos, perfilAluno };

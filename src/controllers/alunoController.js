const alunoService = require('../service/alunoService');

async function listarAlunos(req, res) {
  try {
    const { curso, idioma } = req.query;
    const alunos = alunoService.listarAlunos({ user: req.user, filtroCurso: curso, filtroIdioma: idioma });
    res.status(200).json(alunos);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

async function perfilAluno(req, res) {
  try {
    const perfil = alunoService.perfilAluno({ user: req.user });
    res.status(200).json(perfil);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = { listarAlunos, perfilAluno };

// Inscrição de aluno em curso
const cursoService = require('../service/cursoService');
async function inscreverEmCurso(req, res) {
  try {
    if (req.user.tipo !== 'aluno') return res.status(403).json({ error: 'Apenas alunos podem se inscrever em cursos.' });
    const { cursoId } = req.body;
    if (!cursoId) return res.status(400).json({ error: 'Informe o ID do curso.' });
    const curso = cursoService.matricularAluno({ alunoId: req.user.id, cursoId: Number(cursoId) });
    // Atualiza cursos do aluno
    const db = require('../model/database');
    const aluno = db.users.find(u => u.id === req.user.id);
    if (aluno && !aluno.cursos.includes(Number(cursoId))) aluno.cursos.push(Number(cursoId));
    res.status(200).json({ message: 'Inscrição realizada com sucesso.', curso });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports.inscreverEmCurso = inscreverEmCurso;

const cursoService = require('../service/cursoService');

async function criarCurso(req, res) {
  try {
    if (req.user.tipo !== 'professor') return res.status(403).json({ error: 'Apenas professores podem criar cursos.' });
    const { nome, idioma, nivel, descricao } = req.body;
    const curso = cursoService.criarCurso({ nome, idioma, nivel, descricao, professorId: req.user.id });
    res.status(201).json(curso);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

async function listarCursos(req, res) {
  try {
    const cursos = cursoService.listarCursos({ user: req.user });
    res.status(200).json(cursos);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = { criarCurso, listarCursos };

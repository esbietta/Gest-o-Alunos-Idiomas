const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const { authenticateJWT } = require('../middleware/auth');


router.get('/', authenticateJWT, alunoController.listarAlunos);
router.get('/perfil', authenticateJWT, alunoController.perfilAluno);
router.post('/inscrever', authenticateJWT, alunoController.inscreverEmCurso);

module.exports = router;

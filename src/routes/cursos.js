const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const { authenticateJWT } = require('../middleware/auth');

router.post('/', authenticateJWT, cursoController.criarCurso);
router.get('/', authenticateJWT, cursoController.listarCursos);

module.exports = router;

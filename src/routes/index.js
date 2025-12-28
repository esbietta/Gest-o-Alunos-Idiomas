const express = require('express');
const alunosRoutes = require('./alunos');
const authRoutes = require('./auth');
const cursosRoutes = require('./cursos');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/cursos', cursosRoutes);
router.use('/alunos', alunosRoutes);

module.exports = router;

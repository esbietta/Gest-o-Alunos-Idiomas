const jwt = require('jsonwebtoken');
const userService = require('../service/userService');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido.' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido.' });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido ou expirado.' });
    const user = userService.findUserByEmail(decoded.id ? undefined : decoded.email);
    req.user = { id: decoded.id, tipo: decoded.tipo, ...user };
    next();
  });
}

module.exports = { authenticateJWT };

const userService = require('../service/userService');

async function register(req, res) {
  try {
    const { nome, email, senha, tipo } = req.body;
    const result = userService.registerUser({ nome, email, senha, tipo });
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const result = userService.loginUser({ email, senha });
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = { register, login };

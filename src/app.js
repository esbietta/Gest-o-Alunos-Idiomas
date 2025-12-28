const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../recursos/swagger.json');

const app = express();

app.use(bodyParser.json());

// Rotas da API
app.use('/api', routes);

// Endpoint para documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Tratamento de rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

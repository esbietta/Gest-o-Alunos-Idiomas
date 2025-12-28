require('dotenv').config();
const supertest = require('supertest');
const baseURL = process.env.BASE_URL || 'http://localhost:3000';

function getApi() {
  return supertest(baseURL);
}

module.exports = { getApi };

// =====================================================
// auth.js — Função de autenticação reutilizável
// Retorna o token Bearer pra usar nos testes
// =====================================================

const { spec } = require('pactum');
const env = require('./env');

let token = null;

const login = async () => {
  if (token) return token; // evita login repetido

  const res = await spec()
    .post(`${env.BASE_URL}/authUser`)
    .withJson(env.CREDENTIALS)
    .expectStatus(200)
    .returns('body');

  // Tenta pegar o token em formatos comuns de API
  token = res.token || res.accessToken || res.access_token || '';
  return token;
};

const getAuthHeader = async () => {
  const t = await login();
  return { Authorization: `Bearer ${t}` };
};

module.exports = { login, getAuthHeader };
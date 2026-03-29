// =====================================================
// productConsumer.test.js — Contrato do CONSUMIDOR
// Define o que o consumer espera da API de Product
// =====================================================

const { spec } = require('pactum');
const env = require('../../support/env');
const { getAuthHeader } = require('../../support/auth');
const { number, string } = require('pactum-matchers');

describe('Contrato Consumer - addProduct', () => {
  let authHeader;

  before(async () => {
    authHeader = await getAuthHeader();
  });

  it('contrato: addProduct deve retornar id, name e price do tipo correto', async () => {
    await spec()
      .post(`${env.BASE_URL}/addProduct`)
      .withHeaders(authHeader)
      .withJson({
        name: `Contrato Prod ${Date.now()}`,
        description: 'Teste de contrato consumer',
        price: 49.99
      })
      .expectStatus(201)
      .expectJsonMatch({
        id: number(),
        name: string()
      });
  });
});
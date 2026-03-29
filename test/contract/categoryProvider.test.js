// =====================================================
// categoryProvider.test.js — Contrato do PROVIDER
// Valida que a API (provider) entrega o shape esperado
// =====================================================

const { spec } = require('pactum');
const env = require('../../support/env');
const { getAuthHeader } = require('../../support/auth');
const { like } = require('pactum-matchers');

describe('Contrato Provider - Category', () => {
  let authHeader;
  let categoryId;

  before(async () => {
    authHeader = await getAuthHeader();

    // Setup: cria categoria para usar no contrato
    const res = await spec()
      .post(`${env.BASE_URL}/addCategory`)
      .withHeaders(authHeader)
      .withJson({ name: `Provider Cat ${Date.now()}`, description: 'provider test' })
      .expectStatus(201)
      .returns('body');

    categoryId = res.id || res.data?.id;
  });

  it('provider deve retornar estrutura correta ao criar categoria', async () => {
    await spec()
      .post(`${env.BASE_URL}/addCategory`)
      .withHeaders(authHeader)
      .withJson({ name: `Validate ${Date.now()}`, description: 'validate shape' })
      .expectStatus(201)
      .expectJsonMatch(like({
        id: 1,
        name: 'string'
      }));
  });

  after(async () => {
    if (categoryId) {
      await spec()
        .delete(`${env.BASE_URL}/deleteCategory/${categoryId}`)
        .withHeaders(authHeader);
    }
  });
});
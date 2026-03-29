// =====================================================
// productProvider.test.js — Contrato do PROVIDER
// Valida que a API (provider) entrega o shape esperado
// =====================================================

const { spec } = require('pactum');
const env = require('../../support/env');
const { getAuthHeader } = require('../../support/auth');
const { like } = require('pactum-matchers');

describe('Contrato Provider - Product', () => {
  let authHeader;
  let productId;

  before(async () => {
    authHeader = await getAuthHeader();

    const res = await spec()
      .post(`${env.BASE_URL}/addProduct`)
      .withHeaders(authHeader)
      .withJson({ name: `Provider Prod ${Date.now()}`, price: 99.99, description: 'provider' })
      .expectStatus(201)
      .returns('body');

    productId = res.id || res.data?.id;
  });

  it('provider deve retornar estrutura correta ao criar produto', async () => {
    await spec()
      .post(`${env.BASE_URL}/addProduct`)
      .withHeaders(authHeader)
      .withJson({ name: `Validate ${Date.now()}`, price: 59.99, description: 'validate' })
      .expectStatus(201)
      .expectJsonMatch(like({
        id: 1,
        name: 'string'
      }));
  });

  after(async () => {
    if (productId) {
      await spec()
        .delete(`${env.BASE_URL}/deleteProduct/${productId}`)
        .withHeaders(authHeader);
    }
  });
});
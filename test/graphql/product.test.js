// =====================================================
// product.test.js — Testes REST para Produtos
// Cobre: addProduct, editProduct, deleteProduct
// =====================================================

const { spec } = require('pactum');
const env = require('../../support/env');
const { getAuthHeader } = require('../../support/auth');
const { addProductPayload, editProductPayload } = require('../../support/payloads/product.payload');

describe('REST - Produtos', () => {
  let productId;
  let authHeader;

  before(async () => {
    authHeader = await getAuthHeader();
  });

  // ─── addProduct ────────────────────────────────────
  describe('addProduct', () => {
    it('deve criar um produto com sucesso', async () => {
      const res = await spec()
        .post(`${env.BASE_URL}/addProduct`)
        .withHeaders(authHeader)
        .withJson(addProductPayload())
        .expectStatus(201)
        .returns('body');

      productId = res.id || res.product?.id || res.data?.id;
    });

    it('deve retornar erro ao criar produto sem nome', async () => {
      await spec()
        .post(`${env.BASE_URL}/addProduct`)
        .withHeaders(authHeader)
        .withJson({ price: 50 })
        .expectStatus(400);
    });
  });

  // ─── editProduct ───────────────────────────────────
  describe('editProduct', () => {
    it('deve editar um produto existente', async () => {
      await spec()
        .put(`${env.BASE_URL}/editProduct/${productId}`)
        .withHeaders(authHeader)
        .withJson(editProductPayload())
        .expectStatus(200);
    });
  });

  // ─── deleteProduct ─────────────────────────────────
  describe('deleteProduct', () => {
    it('deve deletar o produto criado', async () => {
      await spec()
        .delete(`${env.BASE_URL}/deleteProduct/${productId}`)
        .withHeaders(authHeader)
        .expectStatus(200);
    });

    it('deve retornar erro ao deletar produto inexistente', async () => {
      await spec()
        .delete(`${env.BASE_URL}/deleteProduct/999999`)
        .withHeaders(authHeader)
        .expectStatus(404);
    });
  });
});
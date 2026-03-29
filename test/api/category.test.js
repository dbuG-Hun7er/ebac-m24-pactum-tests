// =====================================================
// category.test.js — Testes REST para Categorias
// Cobre: addCategory, editCategory, deleteCategory
// =====================================================

const { spec } = require('pactum');
const env = require('../../support/env');
const { getAuthHeader } = require('../../support/auth');
const { addCategoryPayload, editCategoryPayload } = require('../../support/payloads/category.payload');

describe('REST - Categorias', () => {
  let categoryId;
  let authHeader;

  before(async () => {
    authHeader = await getAuthHeader();
  });

  // ─── addCategory ───────────────────────────────────
  describe('addCategory', () => {
    it('deve criar uma categoria com sucesso', async () => {
      const res = await spec()
        .post(`${env.BASE_URL}/addCategory`)
        .withHeaders(authHeader)
        .withJson(addCategoryPayload())
        .expectStatus(201)
        .returns('body');

      categoryId = res.id || res.category?.id || res.data?.id;
    });

    it('deve retornar erro ao criar categoria sem nome', async () => {
      await spec()
        .post(`${env.BASE_URL}/addCategory`)
        .withHeaders(authHeader)
        .withJson({ description: 'sem nome' })
        .expectStatus(400);
    });
  });

  // ─── editCategory ──────────────────────────────────
  describe('editCategory', () => {
    it('deve editar uma categoria existente', async () => {
      await spec()
        .put(`${env.BASE_URL}/editCategory/${categoryId}`)
        .withHeaders(authHeader)
        .withJson(editCategoryPayload())
        .expectStatus(200);
    });
  });

  // ─── deleteCategory ────────────────────────────────
  describe('deleteCategory', () => {
    it('deve deletar a categoria criada', async () => {
      await spec()
        .delete(`${env.BASE_URL}/deleteCategory/${categoryId}`)
        .withHeaders(authHeader)
        .expectStatus(200);
    });

    it('deve retornar erro ao deletar categoria inexistente', async () => {
      await spec()
        .delete(`${env.BASE_URL}/deleteCategory/999999`)
        .withHeaders(authHeader)
        .expectStatus(404);
    });
  });
});
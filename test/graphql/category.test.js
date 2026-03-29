// =====================================================
// graphql/category.test.js — Testes GraphQL Categorias
// Usa mutation addCategory via GraphQL
// =====================================================

const { spec } = require('pactum');
const env = require('../../support/env');
const { getAuthHeader } = require('../../support/auth');

describe('GraphQL - Categorias', () => {
  let authHeader;
  let categoryId;

  before(async () => {
    authHeader = await getAuthHeader();
  });

  it('deve fazer introspection na API GraphQL', async () => {
    await spec()
      .post(env.GRAPHQL_URL)
      .withHeaders(authHeader)
      .withGraphQLQuery(`
        {
          __schema {
            queryType {
              name
            }
          }
        }
      `)
      .expectStatus(200)
      .expectJsonLike({ data: { __schema: {} } });
  });

  it('deve criar uma categoria via GraphQL (addCategory)', async () => {
    const timestamp = Date.now();
    const res = await spec()
      .post(env.GRAPHQL_URL)
      .withHeaders(authHeader)
      .withGraphQLQuery(`
        mutation {
          addCategory(name: "GQL Categoria ${timestamp}", description: "Criado via GraphQL") {
            id
            name
          }
        }
      `)
      .expectStatus(200)
      .returns('body');

    categoryId = res?.data?.addCategory?.id;
    console.log('Categoria criada via GQL:', categoryId);
  });

  it('deve editar uma categoria via GraphQL (editCategory)', async () => {
    if (!categoryId) return; // pula se a criação falhou

    await spec()
      .post(env.GRAPHQL_URL)
      .withHeaders(authHeader)
      .withGraphQLQuery(`
        mutation {
          editCategory(id: ${categoryId}, name: "GQL Editada", description: "Editado via GraphQL") {
            id
            name
          }
        }
      `)
      .expectStatus(200);
  });

  it('deve deletar uma categoria via GraphQL (deleteCategory)', async () => {
    if (!categoryId) return;

    await spec()
      .post(env.GRAPHQL_URL)
      .withHeaders(authHeader)
      .withGraphQLQuery(`
        mutation {
          deleteCategory(id: ${categoryId}) {
            id
          }
        }
      `)
      .expectStatus(200);
  });
});
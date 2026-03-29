// =====================================================
// graphql/product.test.js — Testes GraphQL Produtos
// =====================================================

const { spec } = require('pactum');
const env = require('../../support/env');
const { getAuthHeader } = require('../../support/auth');

describe('GraphQL - Produtos', () => {
  let authHeader;
  let productId;

  before(async () => {
    authHeader = await getAuthHeader();
  });

  it('deve criar um produto via GraphQL (addProduct)', async () => {
    const timestamp = Date.now();
    const res = await spec()
      .post(env.GRAPHQL_URL)
      .withHeaders(authHeader)
      .withGraphQLQuery(`
        mutation {
          addProduct(name: "GQL Produto ${timestamp}", price: 99.99, description: "via GraphQL") {
            id
            name
          }
        }
      `)
      .expectStatus(200)
      .returns('body');

    productId = res?.data?.addProduct?.id;
  });

  it('deve editar um produto via GraphQL (editProduct)', async () => {
    if (!productId) return;

    await spec()
      .post(env.GRAPHQL_URL)
      .withHeaders(authHeader)
      .withGraphQLQuery(`
        mutation {
          editProduct(id: ${productId}, name: "GQL Produto Editado", price: 149.99) {
            id
            name
          }
        }
      `)
      .expectStatus(200);
  });

  it('deve deletar um produto via GraphQL (deleteProduct)', async () => {
    if (!productId) return;

    await spec()
      .post(env.GRAPHQL_URL)
      .withHeaders(authHeader)
      .withGraphQLQuery(`
        mutation {
          deleteProduct(id: ${productId}) {
            id
          }
        }
      `)
      .expectStatus(200);
  });
});
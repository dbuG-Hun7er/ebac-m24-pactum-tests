// =====================================================
// product.payload.js — Builders de payload
// =====================================================

const timestamp = () => Date.now();

const addProductPayload = (categoryId = 1) => ({
  name: `Produto Teste ${timestamp()}`,
  description: 'Produto criado via automação PactumJS',
  price: 99.99,
  categoryId: categoryId
});

const editProductPayload = () => ({
  name: `Produto Editado ${timestamp()}`,
  description: 'Produto editado via automação PactumJS',
  price: 149.99
});

module.exports = { addProductPayload, editProductPayload };
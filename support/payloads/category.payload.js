// =====================================================
// category.payload.js — Builders de payload
// Gera dados dinâmicos pra evitar conflito entre testes
// =====================================================

const timestamp = () => Date.now();

const addCategoryPayload = () => ({
  name: `Categoria Teste ${timestamp()}`,
  description: 'Categoria criada via automação PactumJS'
});

const editCategoryPayload = () => ({
  name: `Categoria Editada ${timestamp()}`,
  description: 'Categoria editada via automação PactumJS'
});

module.exports = { addCategoryPayload, editCategoryPayload };
# ebac-m24-pactum-tests

Projeto de automação de testes de API desenvolvido como exercício do **Módulo 24** do curso **Profissão: Engenheiro de Qualidade de Software** da [EBAC](https://ebaconline.com.br/).

Cobre testes **REST**, **GraphQL** e **Testes de Contrato** utilizando [PactumJS](https://pactumjs.github.io/) + [Mocha](https://mochajs.org/).

---

## 🎯 O que é testado

| Serviço    | REST (add/edit/delete) | GraphQL | Contrato (Consumer + Provider) |
|------------|------------------------|---------|-------------------------------|
| Categoria  | ✅                      | ✅      | ✅                             |
| Produto    | ✅                      | ✅      | ✅                             |

---

## 🛠️ Pré-requisitos

Instale apenas uma vez na sua máquina:

### 1. Node.js (versão 18 ou 20 — LTS recomendado)

Baixe em: https://nodejs.org/

Confirme no terminal:
```bash
node -v
npm -v
```

### 2. Docker Desktop

Necessário para subir o **PactumFlow** (servidor de testes de contrato).

Baixe em: https://www.docker.com/products/docker-desktop/

Confirme no terminal:
```bash
docker -v
docker compose version
```

### 3. Git

Baixe em: https://git-scm.com/

---

## 🚀 Como instalar e rodar o projeto

### Passo 1 — Clonar o repositório
```bash
git clone https://github.com/SEU-USUARIO/ebac-m24-pactum-tests.git
cd ebac-m24-pactum-tests
```

### Passo 2 — Instalar as dependências
```bash
npm install
```

### Passo 3 — Subir o servidor de contratos (PactumFlow) via Docker

> Necessário **apenas** para rodar os testes de contrato.
```bash
docker compose up -d
```

Verifique se está rodando:
```bash
docker ps
```

Você deve ver `pactumjs/flows` e `mongo` na lista.

A interface do PactumFlow fica disponível em: http://localhost:8080

---

## ▶️ Rodando os testes

### Todos os testes
```bash
npm test
```

### Apenas testes REST
```bash
npm run test:rest
```

### Apenas testes GraphQL
```bash
npm run test:graphql
```

### Apenas testes de contrato
```bash
npm run test:contract
```

### Separando consumer e provider
```bash
npm run test:contract:consumer
npm run test:contract:provider
```

---

## 📁 Estrutura do projeto
```
ebac-m24-pactum-tests/
├── test/
│   ├── api/                        # Testes REST (CRUD)
│   │   ├── category.test.js        # addCategory, editCategory, deleteCategory
│   │   └── product.test.js         # addProduct, editProduct, deleteProduct
│   ├── graphql/                    # Testes via GraphQL
│   │   ├── category.test.js
│   │   └── product.test.js
│   └── contract/                   # Testes de contrato
│       ├── categoryConsumer.test.js
│       ├── categoryProvider.test.js
│       ├── productConsumer.test.js
│       └── productProvider.test.js
├── support/
│   ├── env.js                      # URLs e credenciais centralizadas
│   ├── auth.js                     # Função de autenticação reutilizável
│   └── payloads/
│       ├── category.payload.js     # Builders de dados de categoria
│       └── product.payload.js      # Builders de dados de produto
├── docker-compose.yml              # PactumFlow + MongoDB
├── package.json
├── .gitignore
└── README.md
```

---

## 🔧 Variáveis de ambiente

Todas as configurações ficam centralizadas em `support/env.js`:

| Variável         | Descrição                         | Valor padrão                                        |
|------------------|-----------------------------------|-----------------------------------------------------|
| `BASE_URL`       | URL base da API REST              | `http://lojaebac.ebaconline.art.br/public`          |
| `GRAPHQL_URL`    | URL do endpoint GraphQL           | `http://lojaebac.ebaconline.art.br/graphql`         |
| `PACTUM_FLOW_URL`| URL do servidor PactumFlow local  | `http://localhost:8080`                             |
| `CREDENTIALS`    | Login do admin                    | `admin@admin.com` / `admin123`                      |

---

## 📚 Tecnologias utilizadas

- [PactumJS](https://pactumjs.github.io/) — Automação de testes de API REST e GraphQL
- [Pactum Flow Plugin](https://www.npmjs.com/package/pactum-flow-plugin) — Testes de contrato
- [Pactum Matchers](https://www.npmjs.com/package/pactum-matchers) — Validação de schema/shape
- [Mocha](https://mochajs.org/) — Framework de testes
- [Docker](https://www.docker.com/) — Servidor PactumFlow local

---

## 📖 Referências do Módulo

- [GraphQL Docs](https://graphql.org)
- [PactumJS Docs](https://pactumjs.github.io/)
- [Repositório GraphQL do professor](https://github.com/EBAC-QE/pactum-graphql)
- [Repositório Contrato do professor](https://github.com/EBAC-QE/pactum-contract)

---

## 👤 Autor

**Seu Nome Aqui**  
[GitHub](https://github.com/dbuG-Hun7er) | [LinkedIn](https://www.linkedin.com/in/dbughun7er/)

---

**Branch principal:** `main`
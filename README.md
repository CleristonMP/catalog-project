# Catalog Project

## Descrição Geral
O projeto Catalog é uma aplicação web desenvolvida usando o framework Spring para o backend e React para o frontend. Ele foi projetado para fornecer uma plataforma centralizada onde usuários podem gerenciar e visualizar informações sobre diversos catálogos de produtos.

## Funcionalidades Chave
- **Autenticação e Autorização**: O sistema possui recursos de autenticação e autorização, permitindo que usuários façam login e tenham acesso a funcionalidades específicas com base em suas permissões.
- **Gerenciamento de Catálogos**: Os usuários podem criar, atualizar, excluir e visualizar catálogos de produtos. Cada catálogo contém informações detalhadas sobre os produtos.
- **Pesquisa e Filtragem**: Os usuários podem pesquisar e filtrar catálogos e produtos com base em diversos critérios, como nome, descrição, categoria, preço, etc.
- **Relatórios e Análises**: O sistema gera relatórios e análises sobre os catálogos e produtos, fornecendo insights valiosos para os usuários.

## Tecnologias Utilizadas
**Backend (Spring):**
- Java 11
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL
- Maven

**Frontend (React):**
- React 18
- React Router
- Axios
- Tailwind CSS
- Recharts

## Rotas da API
**Autenticação**:
- `POST /api/auth/login`: Realiza o login do usuário
- `POST /api/auth/register`: Cadastra um novo usuário

**Catálogos**:
- `GET /api/catalogs`: Obtém a lista de catálogos
- `GET /api/catalogs/{id}`: Obtém os detalhes de um catálogo
- `POST /api/catalogs`: Cria um novo catálogo
- `PUT /api/catalogs/{id}`: Atualiza um catálogo
- `DELETE /api/catalogs/{id}`: Exclui um catálogo

**Produtos**:
- `GET /api/products`: Obtém a lista de produtos
- `GET /api/products/{id}`: Obtém os detalhes de um produto
- `POST /api/products`: Cria um novo produto
- `PUT /api/products/{id}`: Atualiza um produto
- `DELETE /api/products/{id}`: Exclui um produto

## Como Executar o Projeto
1. Clonar o repositório do GitHub: `https://github.com/CleristonMP/catalog-project.git`
2. Configurar o banco de dados PostgreSQL e atualizar as informações de conexão no arquivo `application.properties` do backend.
3. Navegar até o diretório do backend e executar o comando `./mvnw spring-boot:run` para iniciar o servidor.
4. Navegar até o diretório do frontend e executar os comandos `npm install` e `npm start` para iniciar o cliente React.
5. Acessar a aplicação no navegador em `http://localhost:3000`.

## Próximos Passos
- Implementar funcionalidade de exportação de dados dos catálogos.
- Adicionar testes automatizados para garantir a integridade do sistema.
- Melhorar a interface do usuário com recursos de drag-and-drop e reorganização de catálogos.

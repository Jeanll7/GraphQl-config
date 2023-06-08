const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  type Usuario {
    id: ID
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  # Pontos de entrada da sua API!
  type Query {
    ola: String!
    horaAtual: Date!
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
  }
`;

const resolvers = {
  Usuario: {
    salario(parent) {
      return parent.salario_real;
    },
  },

  Query: {
    ola() {
      return "Bom dia";
    },
    horaAtual() {
      return new Date();
    },
    usuarioLogado(obj) {
      console.log(obj);
      return {
        id: 1,
        nome: "Ana da web",
        email: "anaweb@email.com",
        idade: 23,
        salario_real: 1234.56,
        vip: true,
      };
    },
    produtoEmDestaque() {
      return {
        nome: "Notebook Gamer",
        preco: 4999.5,
        desconto: 0.15,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// server.listen(3000).then(({ url }) => {
server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});

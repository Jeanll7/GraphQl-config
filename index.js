const { ApolloServer, gql } = require("apollo-server");

const usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "jsilva@zemail.com",
    idade: 29,
  },
  {
    id: 2,
    nome: "Ana Paula",
    email: "ana@puaemail.com",
    idade: 31,
  },
  {
    id: 3,
    nome: "Daniela Smith",
    email: "danis@sthemail.com",
    idade: 24,
  },
];

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
    numerosAleatorios: [Int]! # ! obrigatoriamente vai retornar um array
    usuarios: [Usuario]
  }
`;

const resolvers = {
  Produto: {
    precoComDesconto(produto) {
      // if (produto.desconto) {
      //   return produto.preco * (1 - produto.desconto);
      // } else {
      //   return produto.preco;
      // }
      return produto.desconto
        ? produto.preco * (1 - produto.desconto)
        : produto.preco;
    },
  },

  Usuario: {
    salario(usuario) {
      return usuario.salario_real;
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
        preco: 5000.0,
        desconto: 0.5, // 50%
        // desconto: 0.15, // 15%
      };
    },
    numerosAleatorios() {
      const crescente = new Set();

      while (crescente.size < 6) {
        crescente.add(Math.floor(Math.random() * 60 + 1));
      }
      return [...crescente].sort((a, b) => a - b);
    },
    usuarios() {
      return usuarios;
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

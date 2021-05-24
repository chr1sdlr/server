const { gql } = require("apollo-server");

// Esquema de usuario para GraphQL, aqui se definen todos los datos que puede devolver la petición
const typeDef = gql`
  type User {
    id: ID
    name: String
    surname: String
    username: String
    email: String
    avatar: String
    webSite: String
    description: String
    password: String
    createdAt: String
  }

  type Token {
    token: String
  }

  type UpdateAvatar {
    status: Boolean,
    urlAvatar: String
  }

  # Input creado para obtener los datos del usuario y poder ejecutar la acción de la petición
  input UserInput {
    name: String! # La exclamación significa que es obligatorio
    surname: String!
    username: String!
    email: String!
    password: String!
  }
  # Input creado para hacer la autenticación del usuario
  input LoginInput {
    email: String!
    password: String!
  }

  # Querys que se van a realizar en GraphQL
  type Query {
    # Para el usuario:
    getUser(id: ID, username: String): User
  }

  type Mutation {
    # Para el usuario:
    register(input: UserInput): User # Esta función devuelve un objeto de tipo "User" luego de registrar a un usuario en la BD.
    # Para el login:
    login(input: LoginInput): Token # Esta función devuelve un Token
    # Para el avatar del usuario:
    updateAvatar(file: Upload): UpdateAvatar # Devuelve la actualización para subir el avatar del usuario
    # Para eliminar el avatar actual del usuario:
    deleteAvatar: Boolean # Si ha eliminado correctamente devuelve TRUE, de lo contrario FALSE
  }
`;

module.exports = typeDef;

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
        status: Boolean
        urlAvatar: String
    }

    type Post {
        status: Boolean
        urlFile: String
    }

    type UserPost {
        id: ID
        idUser: ID
        file: String
        fileType: String
        createAt: String
    }

    type CommentUser {
        idPublication: ID
        idUser: User
        userComment: String
        createAt: String
    }

    type PostDescription {
        idPublication: ID
        description: String
        createAt: String
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

    # Input para actualizar datos del usuario
    input UserUpdateInput {
        name: String
        email: String
        currentPassword: String
        newPassword: String
        webSite: String
        description: String
    }

    # Input para el comentario del usuario
    input CommentUserInput {
        idPublication: ID
        userComment: String
    }

    # Input para la descipción de la publicación
    input DescriptionUserInput {
        idPublication: ID
        description: String!
    }

    # Queries que se van a realizar en GraphQL
    type Query {
        # Para el usuario:
        getUser(id: ID, username: String): User # Devuelve solo un usuario
        searchUser(search: String): [User] # Devuelve un array o lista de usuarios
        # Para seguir usuarios (follow)
        isFollower(username: String!): Boolean # Si sigue al user: True, sino: False
        # Query para obtener los seguidores del usuario
        getFollowers(username: String!): [User] # Devuelve un array con los usuarios que lo siguen
        getFolloweds(username: String!): [User] # Para verificar los seguidos
        # Query para obterner las publicaciones del usuario
        getUserPosts(username: String!): [UserPost] # Devuelve un array con las publicaciones
        # Query para obtener la descripción de la publicación
        getPostDescription(search: String!): [PostDescription]
        # Query para obtener lso comentarios de una publicación
        getPostComments(idPublication: ID!): [CommentUser] # Devuelve un array de comentarios
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
        updateUser(input: UserUpdateInput): Boolean
        # Para los follows (seguir usuarios)
        follower(username: String!): Boolean # Devuelve true si lo sigue o false si no lo hace.
        unFollow(username: String!): Boolean
        # Para las publicaciones:
        post(file: Upload): Post # Devuelve en objeto de tipo Post
        # Para la descripción de las publicaciones:
        postDescription(input: DescriptionUserInput): PostDescription
        # Para los comentarios
        addUserComment(input: CommentUserInput): CommentUser # Del CommentUserInput va a devolver el tipo CommentUser
    }
`;

module.exports = typeDef;

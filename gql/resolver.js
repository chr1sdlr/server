const userController = require("../controllers/user");
const loginController = require("../controllers/login");
const followerController = require("../controllers/follower");
const postController = require("../controllers/post");
const postDescriptionController = require("../controllers/postDescription");
const commentController = require("../controllers/comment");

const resolvers = {
    Query: {
        // Para el usuario
        getUser: (_, { id, username }) => userController.getUser(id, username),
        searchUser: (_, { search }) => userController.searchUser(search),
        // Para los followers (saber si sigue a un user o no)
        isFollower: (_, { username }, ctx) =>
            followerController.isFollower(username, ctx),
        // Para obtener los followers
        getFollowers: (_, { username }) =>
            followerController.getFollowers(username),
        // Para obtener a los que se siguen
        getFolloweds: (_, { username }) =>
            followerController.getFolloweds(username),
        // Para obtener las publicaciones del usuario
        getUserPosts: (_, { username }) =>
            postController.getUserPosts(username),
        // Para obtener la descripción de la publicación del usuario
        getPostDescription: (_, { search }) =>
            postController.getPostDescription(search),
        // Para obtener los comentarios de la publicación del usuario
        getPostComments: (_, { idPublication }) =>
            commentController.getPostComments(idPublication),
    },
    // Esta función se ejecuta cada vez que se hace cierta petición
    Mutation: {
        // Peticiones relacionadas con el usuario
        register: (_, { input }) => userController.register(input),
        login: (_, { input }) => loginController.login(input),
        updateAvatar: (_, { file }, ctx) =>
            userController.updateAvatar(file, ctx),
        deleteAvatar: (_, {}, ctx) => userController.deleteAvatar(ctx),
        updateUser: (_, { input }, ctx) =>
            userController.updateUser(input, ctx),
        // Para los follows/followers
        follower: (_, { username }, ctx) =>
            followerController.follower(username, ctx),
        unFollow: (_, { username }, ctx) =>
            followerController.unFollow(username, ctx),
        // Para las publicaciones
        post: (_, { file }, ctx) => postController.post(file, ctx),
        // Para las descripciones de las publicaciones
        postDescription: (_, { input }, ctx) =>
            postDescriptionController.addUserDescription(input, ctx),
        // Para los comentarios
        addUserComment: (_, { input }, ctx) =>
            commentController.addUserComment(input, ctx),
    },
};

module.exports = resolvers;

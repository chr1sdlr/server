const userController = require("../controllers/user");
const loginController = require("../controllers/login");
const followerController = require("../controllers/follower");
const postController = require("../controllers/post");

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
    },
};

module.exports = resolvers;

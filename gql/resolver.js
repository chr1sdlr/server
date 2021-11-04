const userController = require("../controllers/user");
const loginController = require("../controllers/login");
const followerController = require("../controllers/follower");

const resolvers = {
    Query: {
        // Para el usuario
        getUser: (_, { id, username }) => userController.getUser(id, username),
        searchUser: (_, { search }) => userController.searchUser(search),
        // Para los followers
        isFollower: (_, { username }, ctx) =>
            followerController.isFollower(username, ctx),
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
    },
};

module.exports = resolvers;

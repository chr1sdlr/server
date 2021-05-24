const userController = require("../controllers/user");
const loginController = require("../controllers/login");

const resolvers = {
  Query: {
    // Para el usuario
    getUser: (_, { id, username }) => userController.getUser(id, username),
  },
  // Esta función se ejecuta cada vez que se hace cierta petición
  Mutation: {
    // Peticiones relacionadas con el usuario
    register: (_, { input }) => userController.register(input),
    login: (_, { input }) => loginController.login(input),
    updateAvatar: (_, { file }, ctx) => userController.updateAvatar(file, ctx),
    deleteAvatar: (_, { }, ctx) => userController.deleteAvatar(ctx),
  },
};

module.exports = resolvers;

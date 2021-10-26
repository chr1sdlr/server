// Importación de las dependencias a utilizar
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolver");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

// Configuración para la conexión del servidor
mongoose.connect(
    process.env.DDBB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    (err, _) => {
        if (err) {
            console.log("Error de conexión");
        } else {
            server();
        }
    }
);

// Función para realizar la conexión con Apollo Server
function server() {
    const ServerApollo = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization;
            if (token) {
                try {
                    const user = jwt.verify(
                        token.replace("Bearer ", ""),
                        process.env.SECRET_KEY
                    );

                    return {
                        user,
                    };
                } catch (error) {
                    console.log("#### ERROR ####");
                    console.log(error);
                    throw new Error("Token no válido");
                }
            }
        },
    });

    ServerApollo.listen().then(({ url }) => {
        console.log(`Server on port ${url}`);
    });
}

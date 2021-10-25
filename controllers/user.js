const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const awsUploadImage = require("../utils/aws-upload-image");

// Función para peticiones relacionadas con el usuario (controlador)
// Esta función, le pasamos un usuario y nos devuelve un token y a su vez, los datos de ese usuario
function createToken(user, SECRET_KEY, expiresIn) {
    const { id, name, email, username, surname } = user;
    const payload = {
        id,
        name,
        surname,
        email,
        username,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

async function register(input) {
    const newUser = input;
    newUser.email = newUser.email.toLowerCase();
    newUser.username = newUser.username.toLowerCase();

    const { email, username, password } = newUser;

    // Aqui se revisa si una persona ya se ha registrado con el email
    const foundEmail = await User.findOne({ email });
    if (foundEmail) throw new Error("Este email ya está siendo utilizado");

    // Aqui revisa si el username no está en uso
    const foundUsername = await User.findOne({ username });
    if (foundUsername) throw new Error("Este nombre de usuario ya está en uso");

    // Aqui se va a encriptar el password del usuario
    const salt = await bcryptjs.genSaltSync(10);
    newUser.password = await bcryptjs.hash(password, salt);

    /* Aquí se trata de crear y guardar el nuevo usuario, de no ser posible, se trata de capturar el error,
  verificar en que parte de la función falla e imprimir ese error por consola */
    try {
        const user = new User(newUser);
        user.save();
        return user;
    } catch (error) {
        console.log(error);
    }
}

async function getUser(id, username) {
    let user = null;
    if (id) user = await User.findById(id);
    if (username) user = await User.findOne({ username });
    if (!user) throw new Error("Este usuario no existe :c");

    return user;
}

async function updateAvatar(file, ctx) {
    const { id } = ctx.user; // Recuperando el id del context
    const { createReadStream, mimetype } = await file; // Devuelve el tipo de imagen
    const extension = mimetype.split("/")[1]; // Nos devuelve la extensión de la imagen subida al server
    const imageName = `avatar/${id}.${extension}`; // Crea el nombre para la imagen junto a su extensión
    const fileData = createReadStream(); // Crea el archivo para ser subido al server

    try {
        const result = await awsUploadImage(fileData, imageName);
        await User.findByIdAndUpdate(id, { avatar: result }); // Añade la url y el avatar a la bd en MongoDB
        return {
            status: true,
            urlAvatar: result,
        };
    } catch (error) {
        return {
            status: false,
            urlAvatar: null,
        };
    }
}

async function deleteAvatar(ctx) {
    const { id } = ctx.user;

    try {
        await User.findByIdAndUpdate(id, { avatar: "" });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function updateUser(input, ctx) {
    const { id } = ctx.user;

    try {
        if (input.currentPassword && input.newPassword) {
            const userFound = await User.findById(id);
            const passwordSuccess = await bcryptjs.compare(
                input.currentPassword,
                userFound.password
            );

            if (!passwordSuccess)
                throw new Error(
                    "La contraseña que has ingresado no es correcta."
                );

            const salt = await bcryptjs.genSaltSync(10);
            const newPasswordEncrypted = await bcryptjs.hash(
                input.newPassword,
                salt
            );

            await User.findByIdAndUpdate(id, {
                password: newPasswordEncrypted,
            });
        } else {
            await User.findByIdAndUpdate(id, input);
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    register,
    createToken,
    getUser,
    updateAvatar,
    deleteAvatar,
    updateUser,
};

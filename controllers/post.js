const Post = require("../models/post");
const User = require("../models/user");
const PostDescription = require("../models/postDescription");
const AWSUploadImage = require("../utils/aws-upload-image");
const { v4: uuidv4 } = require("uuid");
const { Error } = require("mongoose");

async function post(file, ctx) {
    const { id } = ctx.user;
    const { createReadStream, mimetype } = await file;
    const ext = mimetype.split("/")[1];
    const fileName = `post/${uuidv4()}.${ext}`; // Con la libreria uuid crea un nombre random y se concatena con la extension
    const fileData = createReadStream();

    try {
        const res = await AWSUploadImage(fileData, fileName);
        const post = new Post({
            idUser: id,
            file: res,
            fileType: mimetype.split("/")[0],
            createAt: Date.now(),
        });
        post.save();

        return {
            status: true,
            urlFile: res,
        };
    } catch (error) {
        return {
            status: null,
            urlFile: "",
        };
    }
}

async function getUserPosts(username) {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error("El usuario no ha sido encontrado :c");
    }

    const Posts = await Post.find()
        .where({ idUser: user._id })
        .sort({ createAt: -1 });

    return Posts;
}

async function getPostDescription(search) {
    const Description = await PostDescription.find({
        idPublication: search,
    });

    if (!Description) {
        throw new Error("La publicación no ha sido encontrada");
    }

    return Description;
}

module.exports = {
    post,
    getUserPosts,
    getPostDescription,
};

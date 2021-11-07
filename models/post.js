const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    file: {
        type: String,
        trim: true,
        require: true,
    },
    fileType: {
        type: String,
        trim: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Post", PostSchema);

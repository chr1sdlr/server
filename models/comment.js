const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    idPublication: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Post",
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    userComment: {
        type: String,
        trim: true,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Comment", CommentSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowerSchema = Schema({
    // isUser es el usuario que sigue a follow.
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    follow: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("follower", FollowerSchema);

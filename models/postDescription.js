const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostDescriptionSchema = new Schema({
    idPublication: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Post",
    },
    description: {
        type: String,
        trim: true,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("PostDescription", PostDescriptionSchema);

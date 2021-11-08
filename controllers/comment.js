const Comment = require("../models/comment");

function addUserComment(input, ctx) {
    const { idPublication, userComment } = input;
    const { user } = ctx;
    try {
        const comment = new Comment({
            idPublication,
            idUser: user.id,
            userComment,
        });

        comment.save();

        return comment;
    } catch (error) {
        console.log(error);
    }
    return null;
}

module.exports = {
    addUserComment,
};

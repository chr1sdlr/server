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

async function getPostComments(idPublication) {
    const res = await Comment.find({ idPublication }).populate("idUser");
    return res;
}

module.exports = {
    addUserComment,
    getPostComments,
};

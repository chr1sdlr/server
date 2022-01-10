const PostDescription = require("../models/postDescription");

function addUserDescription(input, ctx) {
    try {
        const postDescription = new PostDescription({
            idPublication: input.idPublication,
            description: input.description,
        });
        postDescription.save();
        return postDescription;
    } catch (error) {
        console.log(error);
    }
    return null;
}

module.exports = {
    addUserDescription,
};

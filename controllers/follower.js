const { Error, Mongoose } = require("mongoose");
const Follower = require("../models/follower");
const User = require("../models/user");

async function follower(username, ctx) {
    const userFound = await User.findOne({ username });
    if (!userFound) throw new Error("No se ha encontrado ese usuario :o");

    try {
        const follower = new Follower({
            idUser: ctx.user.id,
            follow: userFound._id,
        });
        follower.save();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function isFollower(username, ctx) {
    const userFound = await User.findOne({ username });
    if (!userFound) throw new Error("No se ha encontrado ese usuario :o");

    const follower = await Follower.find({ idUser: ctx.user.id })
        .where("follow")
        .equals(userFound._id);

    if (follower.length > 0) {
        return true;
    } else {
        return false;
    }
}

async function unFollow(username, ctx) {
    const userFound = await User.findOne({ username });
    const unFollow = await Follower.deleteOne({ idUser: ctx.user.id })
        .where("follow")
        .equals(userFound._id);

    if (unFollow.deleteCount > 0) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    follower,
    isFollower,
    unFollow,
};

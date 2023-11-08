const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    fullName: String,
    username: {
        type: String,
        index: true
    },
    password: String
}, {timestamps: true});

const userCollection = model("users", userSchema);

module.exports = {
    userCollection
};
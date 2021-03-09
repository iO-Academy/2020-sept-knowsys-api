const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    bio: String
});

//first param is name of relevant collection in MongoDB where data is saved
module.exports = mongoose.model('learners', userSchema);
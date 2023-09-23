const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, optional: true },
    firstName: { type: String, optional: true },
    lastName: { type: String, optional: true },
    wordLeft: { type: Number, default: 10000 },
    recentChanges: { type: Array, default: [] },
    dateCreate: { type: Date, default: Date.now },

});

module.exports = mongoose.model('users', UserSchema)
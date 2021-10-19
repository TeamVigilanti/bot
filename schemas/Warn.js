const mongoose = require('mongoose');

module.exports = new mongoose.model(
    "warnings",
    new mongoose.Schema({
        userID: String,
        guildID: String,
        moderatorID: String,
        reason: String,
        timestamp: Number,
    })
);
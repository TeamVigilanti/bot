const { model, Schema } = require('mongoose')
const { prefix } = require('../config.json')

const GuildSchema = new Schema({
    _id: { type: String },
    premium: { type: Boolean, default: true }, // premium will be free for the first 75 servers and will be granted 'legacy server' perks
    config: {
        prefix: { type: String, default: prefix },
        mutedRole: String,
        modLogs: String,
        reportLogs: String,
        auditLogs: String,
        lockdownCategory: String,
        privateVC: String,
        verifyRole: String,
        verifyChannel: String,
    }
})

module.exports = model('guild-settings', GuildSchema)
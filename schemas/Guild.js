const { model, Schema } = require('mongoose')
const { prefix } = require('../config.json')

const GuildSchema = new Schema({
    _id: { type: String },
    config: {
        prefix: { type: String, default: prefix },
        mutedRole: String,
        modLogs: String,
        reportLogs: String,
        auditLogs: String,
        lockdownCategory: String,
        privateVC: String,
    }
})

module.exports = model('guild-settings', GuildSchema)
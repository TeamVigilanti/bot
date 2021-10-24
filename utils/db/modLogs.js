const Schema = require('../../schemas/Guild')

const modLogsCache = {}

module.exports.setModLogs = (guildId, modLogs) => {
    Schema.findOne({ _id: guildId }, async (err, data) => {
        if (err) throw err

        if (data) {
            data.config.modLogs = modLogs

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    modLogs
                }
            })

            data.save()
        }

        modLogsCache[guildId] = modLogs
    })
}

module.exports.getModLogs = async (guildId) => {
    const result = modLogsCache[guildId] || await Schema.findOne({ _id: guildId })

    return result?.config.modLogs
}
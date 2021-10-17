const Schema = require('../../schemas/Guild')

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
    })
}

module.exports.getModLogs = async (guildId) => {
    const result = await Schema.findOne({ _id: guildId })

    return result?.config.modLogs
    console.log(result)
}
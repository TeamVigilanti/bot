const Schema = require('../../schemas/Guild')

module.exports.setVerifyRole = (guildId, verifyRole) => {
    Schema.findOne({ _id: guildId }, async (err, data) => {
        if (err) throw err

        if (data) {
            data.config.verifyRole = verifyRole

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    verifyRole
                }
            })

            data.save()
        }
    })
}

module.exports.getVerifyRole = async (guildId) => {
    const result = await Schema.findOne({ _id: guildId })

    return result?.config.verifyRole
}

module.exports.setVerifyChannel = (guildId, verifyChannel) => {
    Schema.findOne({ _id: guildId }, async (err, data) => {
        if (err) throw err

        if (data) {
            data.config.verifyChannel = verifyChannel

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    verifyChannel
                }
            })

            data.save()
        }
    })
}

module.exports.getVerifyChannel = async (guildId) => {
    const result = await Schema.findOne({ _id: guildId })

    return result?.config.verifyChannel
}
const Schema = require('../../schemas/Guild')

module.exports.setLockdownCategory = (guildId, lockdownCategory) => {
    Schema.findOne({ _id: guildId }, async (err, data) => {
        if (err) throw err

        if (data) {
            data.config.lockdownCategory = lockdownCategory

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    
                }
            })

            data.save()
        }
    })
}

module.exports.getLockdownCategory = async (guildId) => {
    const result = await Schema.findOne({ _id: guildId })

    return result?.config.lockdownCategory
}
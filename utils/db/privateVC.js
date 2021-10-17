const Schema = require('../../schemas/Guild')

module.exports.setPrivateVC = (guildId, privateVC) => {
    Schema.findOne({ _id: guildId }, async (err, data) => {
        if (err) throw err

        if (data) {
            data.config.privateVC = privateVC

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    privateVC
                }
            })

            data.save()
        }
    })
}

module.exports.getPrivateVC = async (guildId) => {
    const result = await Schema.findOne({ _id: guildId })

    return result?.config.privateVC
}
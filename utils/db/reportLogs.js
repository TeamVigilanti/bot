const Schema = require('../../schemas/Guild')

module.exports.setReportLogs = (guildId, reportLogs) => {
    Schema.findOne({ _id: guildId }, async (err, data) => {
        if (err) throw err

        if (data) {
            data.config.reportLogs = reportLogs

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    reportLogs
                }
            })

            data.save()
        }
    })
}

module.exports.getReportLogs = async (guildId) => {
    const result = await Schema.findOne({ _id: guildId })

    return result?.config.reportLogs
}
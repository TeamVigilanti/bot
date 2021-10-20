const GuildSchema = require('../schemas/Guild')
const { ccEmbed } = require('../utils/ccEmbed-utils')

module.exports = {
    name: 'guildMemberAdd',
    run (member, client) {
        GuildSchema.findOne({ _id: member.guild.id }, async (err, data) => {
            if (err) throw err

            if (!data || !data.config.welcomeChannel?._id) return

            const wChannel = member.guild.channels.cache.get(data.config.welcomeChannel._id)
            const wMessage = data.config.welcomeChannel.text
        })
    }
}
const { ccEmbed } = require("../../utils/ccEmbed-utils")
const { setLeave } = require("../../utils/db/leave-channel-utils")

module.exports = {
    name: 'leavechannel',
    description: 'Sets the leave channel and message for the server.',
    aliases: ['leave', 'leavech', 'lc'],
    usage: '<leave channel> [text]\nIn text you can use\n\n{member} - Left member\n{memberId} - Left member\'s ID\n{server} - Server name',
    category: 'utility',
    permissions: 'MANAGE_CHANNELS',
    run (client, message, args) {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])

        if (!channel) {
            const errEmbed = ccEmbed('error', 'Leave Channel Not Specified', 'Please specify a leave channel!')

            return message.channel.send({ embeds: [errEmbed] })
        }

        let text = args.slice(1).join(' ')

        setLeave(message.guild.id, channel.id, text)

        message.channel.send(`Works! maybe.`)
    }
}
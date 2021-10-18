const { ccEmbed } = require("../../utils/ccEmbed-utils")
const { sendFullHelp, sendCommandOrCategoryHelp, sendDropdownMenuHelp } = require("../../utils/helpManager")

// at the time, this code is very bad. But ill try to somehow clean it with a switch statement
module.exports = {
    name: 'help',
    description: 'Sends a help embed of either all commands, a specifc command, or all the commands in a specifc category.',
    aliases: ['h'],
    usage: '\n1. [-dm]\n2. [-dd]\n3. [category | command] [-dm]',
    category: 'info',
    async run(client, message, args) {
        if (!args[0]) return sendFullHelp(client, message.channel)

        const errEmbed = ccEmbed('error', 'Failed To DM!', 'You seem to have DMs disabled!')
        const embed = ccEmbed('success', 'DM Successfully Sent!', 'Check your DMs!')

        if (args[0] == '-dm') {
            try {
                const sent = await sendFullHelp(client, message.author, message.channel, errEmbed).catch(() => { })

                if (!sent) throw new Error('Cannot DM User')

                return message.channel.send({ embeds: [embed] })
            } catch (err) {
                return message.channel.send({ embeds: [errEmbed] })
            }
        }

        if (args[0] === '-dd') return sendDropdownMenuHelp(client, message.channel, message.author, false)

        if (args[1] == '-dm') {
            try {
                const sent = await sendCommandOrCategoryHelp(client, message.author, args[0], message.author.id)

                if (!sent) throw new Error('Cannot DM User')

                return message.channel.send({ embeds: [embed] })
            } catch (err) {
                return message.channel.send({ embeds: [errEmbed] })
            }
        }

        sendCommandOrCategoryHelp(client, message.channel, args[0], message.author.id)
    }
}
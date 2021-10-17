const { MessageEmbed } = require("discord.js")
const { ccEmbed } = require("../../utils/ccEmbed-utils")

module.exports = {
    name: 'embed',
    description: 'Sends a custom embed',
    aliases: ['e', 'em'],
    usage: '<embed json>',
    category: 'misc',
    permissions: 'ADMINISTRATOR',
    run (client, message, args) {
        try {
            const said = JSON.parse(args.join(' '))

            /* EMBED ERR HANDLING */
            if (said.title?.length > 256) throw new Error('Title must be less than or equal to 256 characters')
            if (said.description?.length > 4096) throw new Error('Title must be less than or equal to 4096 characters')
            for (field of said.fields) {
                if (field?.name?.length > 256) throw new Error('Field names must be less than or equal to 256 characters')
                if (field?.value?.length > 1024) throw new Error('Field values must be less than or equal to 1024 characters')
            }
            /* EMBED ERR HANDLING */

            const embed = new MessageEmbed(said)
            console.log('We stopped here')
            message.channel.send({ embeds: [embed] })
        } catch (err) {
            const errEmbed = ccEmbed('error', 'Invalid JSON!', 'Please use a valid json format\nEg: \n```json\n{"title": "hi"}\n```')
                .addField('Error', `\`\`\`\n${err.toString()}\n\`\`\``)

            message.channel.send({ embeds: [errEmbed] })
        }
    }
}
        
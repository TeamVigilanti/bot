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
            const embed = new MessageEmbed(said)

            message.channel.send({ embeds: [embed] })
        } catch (err) {
            const errEmbed = ccEmbed('error', 'Invalid JSON!', 'Please use a valid json format\nEg: \n```json\n{"title": "hi"}\n```')
                .addField('Error', `\`\`\`\n${err.toString()}\n\`\`\``)

            message.channel.send({ embeds: [errEmbed] })
        }
    }
}
        
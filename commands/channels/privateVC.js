// TODO: Check if already set!


const { ccEmbed } = require("../../utils/ccEmbed-utils");

module.exports = {
    name: 'setlogs',
    description: 'Set the log channels!',
    aliases: ['sr'],
    usage: '<type { create | delete }> <channel>',
    category: 'config',
    permissions: 'MANAGE_ROLES',
    run (client, message, args) {
        switch (args[0]) {
            case 'create':

                
            default:
                const embed = ccEmbed('error', 'Invalid Type!', 'Please specify a valid type!\nValid types are `create` and `delete`!')

                return message.channel.send({ embeds: [embed] })
        }
    }
}

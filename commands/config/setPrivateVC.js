const { setPrivateVC } = require("../../utils/db/privateVC");
const { ccEmbed } = require("../../utils/ccEmbed-utils");

module.exports = {
    name: 'setprivatevc',
    description: 'Set a channel so members can make their own private VC!',
    aliases: ['spvc'],
    usage: '<type { vc }> <Category>',
    category: 'config',
    permissions: 'MANAGE_ROLES',
    run (client, message, args) {
        switch (args[0]) {
            case 'vc':
                const PrivateVC = message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').get(args[1]);

                if (!PrivateVC) {
                    const embed = ccEmbed('error', 'VC Not Found!', 'Please specify a valid VC!')

                    return message.channel.send({ embeds: [embed] })
                }

                setPrivateVC(message.guild.id, PrivateVC.id)

                message.channel.send({ embeds: [ccEmbed('success', 'Set Private VC channel successfully!', `VC #${PrivateVC.name} has been set as the channel to allow users to make their own private VC!`)] })
                break;
            default:
                const embed = ccEmbed('error', 'Invalid Type!', 'Please specify a valid type!\nValid types are `vc`!')

                return message.channel.send({ embeds: [embed] })
        }
    }
}
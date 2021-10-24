// TODO: Check if already set!

const { setVerifyChannel, setVerifyRole } = require("../../utils/db/verification");
const { ccEmbed } = require("../../utils/ccEmbed-utils");

module.exports = {
    name: 'setverification',
    description: 'Setup the verification system!',
    aliases: ['sv'],
    usage: '<type { channel | role }>',
    category: 'config',
    permissions: 'MANAGE_SERVER',
    run (client, message, args) {
        switch (args[0]) {
            case 'channel':
                let verifyChannel;
                if (args[1] === '-this') {
                    verifyChannel = message.channel;
                } else {
                    verifyChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
                }

                if (!verifyChannel) {
                    const embed = ccEmbed('error', 'Channel Not Found!', 'Please specify a valid channel!')

                    return message.channel.send({ embeds: [embed] })
                }

                setVerifyChannel(message.guild.id, verifyChannel.id)

                message.channel.send({ embeds: [ccEmbed('success', 'Set verification channel successfully!', `Channel #${verifyChannel.name} has been set as the verification channel for this server; when new users join they will have to type \`cc!verify\` to gain access to the server!`)] })
                break;
            case 'role':
                const verifyRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
    
                if (!verifyRole) {
                    const embed = ccEmbed('error', 'Role Not Found!', 'Please specify a valid role!')

                    return message.channel.send({ embeds: [embed] })
                }
    
                setVerifyRole(message.guild.id, verifyRole.id)
    
                message.channel.send({ embeds: [ccEmbed('success', 'Set verification role successfully!', `Role @${verifyRole.name} has been set as the role to be given to new members after they pass verification!`)] })
                break;
            default:
                const embed = ccEmbed('error', 'Invalid Type!', 'Please specify a valid type!\nValid types are `channel` `role`!')

                return message.channel.send({ embeds: [embed] })
        }
    }
}
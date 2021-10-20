const { setVerifyRole, setVerifyChannel } = require("../../utils/db/verification");
const { ccEmbed } = require("../../utils/ccEmbed-utils");

module.exports = {
    name: 'verify',
    description: 'Set the verification system settings!',
    aliases: [''],
    usage: '<type { role | notifychannel }> { <role> | <channel> }',
    category: 'config',
    permissions: 'MANAGE_ROLES',
    run (client, message, args) {
        switch (args[0]) {
            case 'role':
                const verifyRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!verifyRole) {
                    const embed = ccEmbed('error', 'Role Not Found!', 'Please specify a valid role!')

                    return message.channel.send({ embeds: [embed] })
                }

                setVerifyRole(message.guild.id, verifyRole.id)

                message.channel.send({ embeds: [ccEmbed('success', 'Set verification role successfully!', `Role ${verifyRole.name} has been set as the role to be given when users pass the captcha!`)] })
                break;
            case 'notifychannel':
                const notifyChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
    
                if (!notifyChannel) {
                    const embed = ccEmbed('error', 'Channel Not Found!', 'Please specify a valid channel!')

                    return message.channel.send({ embeds: [embed] })
                }
    
                setVerifyChannel(message.guild.id, notifyChannel.id)
    
                message.channel.send({ embeds: [ccEmbed('success', 'Set verification notify logs channel successfully!', `Channel #${notifyChannel.name} has been set as the verification notify logs channel for this server! This means if somebody fails the captcha or has their DMs disabled (meaning the bot cannot send them the captcha) they will be notified there!`)] })
                break;
            default:
                const embed = ccEmbed('error', 'Invalid Type!', 'Please specify a valid type!\nValid types are `role` and `notifychannel`!')

                return message.channel.send({ embeds: [embed] })
        }
    }
}
// TODO: Check if already set!

const { setModLogs } = require("../../utils/db/modLogs");
const { setReportLogs } = require("../../utils/db/reportLogs");
const { ccEmbed } = require("../../utils/ccEmbed-utils");

module.exports = {
    name: 'setlogs',
    description: 'Set the log channels!',
    aliases: ['sr'],
    usage: '<type { modlogs | reportlogs }> <channel>',
    category: 'config',
    permissions: 'MANAGE_ROLES',
    run (client, message, args) {
        switch (args[0]) {
            case 'modlogs':
                const modLogsChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])

                if (!modLogsChannel) {
                    const embed = ccEmbed('error', 'Channel Not Found!', 'Please specify a valid channel!')

                    return message.channel.send({ embeds: [embed] })
                }

                setModLogs(message.guild.id, modLogsChannel.id)

                message.channel.send({ embeds: [ccEmbed('success', 'Set mod logs channel successfully!', `Channel #${modLogsChannel.name} has been set as the mod logs channel for this server!`)] })
                break;
            case 'reportlogs':
                const reportLogsChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
    
                if (!reportLogsChannel) {
                    const embed = ccEmbed('error', 'Channel Not Found!', 'Please specify a valid channel!')

                    return message.channel.send({ embeds: [embed] })
                }
    
                setReportLogs(message.guild.id, reportLogsChannel.id)
    
                message.channel.send({ embeds: [ccEmbed('success', 'Set report logs channel successfully!', `Channel #${reportLogsChannel.name} has been set as the report logs channel for this server!`)] })
                break;
            case 'audit': // this is for all events
                const auditLogsChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])

                if (!auditLogsChannel) {
                    const embed = ccEmbed('error', 'Channel Not Found!', 'Please specify a valid channel!')
                    return message.channel.send({ embeds: [embed] })
                }

                setAuditLogs(message.guild.id, auditLogsChannel.id)
                message.channel.send({ embeds: [ccEmbed('success', 'Set report logs channel successfully!', `Channel #${reportLogsChannel.name} has been set as the report logs channel for this server!`)] })
                break;
            default:
                const embed = ccEmbed('error', 'Invalid Type!', 'Please specify a valid type!\nValid types are `modlogs` `reportlogs` and `<placeholder>`!')

                return message.channel.send({ embeds: [embed] })
        }
    }
}
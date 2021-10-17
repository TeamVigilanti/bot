// TODO: Check if already set!

const { setModLogs } = require("../../utils/db/modLogs");
const { setReportLogs } = require("../../utils/db/reportLogs");
const { ccEmbed } = require("../../utils/ccEmbed-utils");

module.exports = {
    name: 'delete',
    description: 'Delete a channel!',
    aliases: [''],
    usage: '<channel>',
    category: 'channels',
    permissions: 'MANAGE_CHANNELS',
    run (client, message, args) {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])

        if (!channel) {
            const embed = ccEmbed('error', 'Channel Not Found!', 'Please specify a valid channel!')

            return message.channel.send({ embeds: [embed] })
        }
        channel.delete({ reason: `[CrowdControl Channel Delete] Initiated by ${message.author.tag}` })

        message.channel.send({ embeds: [ccEmbed('success', 'Alright, boss!', `Channel #${channel.name} has been deleted!`)] })
    }
}
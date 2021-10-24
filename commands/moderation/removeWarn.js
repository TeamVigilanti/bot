const warnModel = require('../../schemas/Warn');

const { MessageEmbed } = require("discord.js")
const { default: ms } = require("ms")
const { ccEmbed } = require("../../utils/ccEmbed-utils")

const { checkModLogs } = require("../../utils/configChecker")

module.exports = {
    name: 'removewarn',
    description: 'Delete a warn',
    aliases: [''],
    usage: '<warnID>',
    category: 'moderation',
    permissions: 'BAN_MEMBERS',
    async run (client, message, args) {
        const modLogs = await checkModLogs(message)
        if (!modLogs) return message.channel.send({ embeds: [ccEmbed('error', 'Error', 'Oops! The moderation module is disabled because the mod logs channel is not set!')] })

        const warnID = args[0]
        if (!warnID.match(/^[0-9a-fA-F]{24}$/)) { return message.channel.send({ embeds: [ccEmbed("error", "404", "Invalid warn ID")] }) }
        const data = await warnModel.findOne({_id: warnID})
        

        if (!data) return message.channel.send({ embeds: [ccEmbed('error', '404', 'Warn not found')] })

        data.delete()

        const target = message.guild.members.cache.get(data.userID)
        return message.channel.send({ embeds: [ccEmbed('success', '200', `Warn removed from ${target}`)] })
        
    }
}
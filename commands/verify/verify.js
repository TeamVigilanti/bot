const { MessageEmbed } = require("discord.js")
const { checkReportLogs } = require("../../utils/configChecker")
const emojis = require("../../data/emojis")
const { 
    isVerifyRole, isVerifyChannel, pullVerifyRole, pullVerifyChannel 
} = require('../../utils/configSettingsHelper');
const { ccEmbed } = require("../../utils/ccEmbed-utils");

module.exports = {
    name: 'verify',
    description: 'Report a user',
    aliases: [],
    usage: '',
    category: 'reports',
    permissions: '',
    async run (client, message, args) {
        const channel = await pullVerifyChannel(message)
        const role = await pullVerifyRole(message)
        if(!role) return
        if(!channel) return
        if(message.channel != `${channel}`) return message.channel.send({ embeds: [ccEmbed('error', 'Nope!', `You can only use this command in <#${channel}>`)] })
        
        let user = message.author
        const verified = message.member.roles.cache.has(role);
        if(verified) {
            return message.channel.send({ embeds: [ccEmbed('error', 'Nope!', `You already are verified silly!`)] })
        } else {
            message.member.roles.add(role)
            message.channel.send({ embeds: [ccEmbed('success', 'Success!', `You are now verified!`)] })
        }
    }
}
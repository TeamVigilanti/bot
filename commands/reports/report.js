const { MessageEmbed } = require("discord.js")
const { ccEmbed } = require("../../utils/ccEmbed-utils")
const { checkReportLogs } = require("../../utils/configChecker")
const emojis = require("../../data/emojis")

module.exports = {
    name: 'report',
    description: 'Report a user',
    aliases: [],
    usage: '<user> <reason>',
    category: 'reports',
    permissions: '',
    async run (client, message, args) {
        const reportLogs = await checkReportLogs(message)
        if (!reportLogs) return message.channel.send({ embeds: [ccEmbed('error', 'Error', 'Oops! The report module is disabled because the report logs channel is not set!')] })
        
        let user = message.mentions.users.first() || await message.guild.members.fetch(args[0])
        
        if (!user) return message.channel.send({ embeds: [ccEmbed('error', "Error", "Please specify a user to report")] })

        const member = await message.guild.members.fetch(user.id)

        message.member ??= await message.guild.members.fetch(message.author.id)

        if (user.bot) return message.channel.send({ content: `${emojis.kek} The bot's are harmless, I promise. (You can't report a bot silly)` })
        if(user.id === message.author.id) return message.channel.send({ content: `You can't report yourself! ${emojis.kek}` })
        if (member.roles.highest.id === message.member.roles.highest.id || member.roles.highest.id === message.guild.me.roles.highest.id) return message.channel.send({ content: 'No can-do chief, either the user you are trying to report has a higher role than you, or they have a higher role than me!' })
        
        let reason = args.slice(1).join(" ")
        
        if (!reason) return message.channel.send({ embeds: [ccEmbed('error', "Error", "Please specify a reason for the report")] })
        console.log(reportLogs)
        reportChannel = message.guild.channels.cache.get(reportLogs)
        let reportEmbed = new MessageEmbed()
            .setTitle("Report")
            .setColor("#ff0000")
            .setDescription(`**Reported User:** ${user} (${user.id})\n**Reported By:** ${message.author} (${message.author.id})\n**Reason:** ${reason}`)
            .setTimestamp()
        reportChannel.send({ embeds: [reportEmbed] })
    }
}
const warnModel = require('../../schemas/Warn');
const { checkModLogs } = require("../../utils/configChecker")
const { MessageEmbed } = require("discord.js")
const { default: ms } = require("ms")
const { ccEmbed } = require("../../utils/ccEmbed-utils")

module.exports = {
    name: 'warn',
    description: 'Warn the specified member',
    aliases: ['w'],
    usage: '<member> [reason]',
    category: 'moderation',
    permissions: 'MANAGE_MESSAGES',
    async run (client, message, args) {
        const modLogs = await checkModLogs(message)
        if (!modLogs) return message.channel.send({ embeds: [ccEmbed('error', 'Error', 'Oops! The moderation module is disabled because the mod logs channel is not set!')] })
        const target = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(e => { const target = undefined })
        const reason = args.slice(1).join(' ')

        if (!target || !args[0]) return message.channel.send('Hmm.. double check that user, it doesn\'t seem correct!')

        if (target.id === message.author.id) return message.channel.send('You can\'t warn yourself silly!')

        if (target.id === client.user.id) return message.channel.send('You\'re gonna warn me? **I don\'t think so... :thinking_face:**')

        if (target.user.bot) return message.channel.send('You can\'t warn a bot!')

        if (!message.member) await message.guild.members.fetch(message.author.id)

        if (target.roles.highest.id === message.member.roles.highest.id || target.roles.highest.id === message.guild.me.roles.highest.id) return message.channel.send('The member you are trying to warm has the same role as you/me!')

        new warnModel({
            guildID: message.guild.id,
            userID: target.id,
            moderatorID: message.author.id,
            reason: reason,
            timestamp: Date.now()
        }).save()

        try {
            target.send({ embeds: [ccEmbed('error', 'Moderation Action', `You have been warned in ${message.guild.name} for: ${reason}.\nIf you wish to dispute this warn, please contact the server's staff.`)] })
        } catch (e) {
            console.log(e)
        }

        const warnEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Warn')
            .setDescription(`${target} has been warned by ${message.author} for \`${reason}\``)
            .setTimestamp()
        message.channel.send({ embeds: [warnEmbed] })
    }
}
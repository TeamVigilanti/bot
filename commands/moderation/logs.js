const warnModel = require('../../schemas/Warn');
const moment = require('moment');

const { MessageEmbed } = require("discord.js")
const { default: ms } = require("ms")
const { ccEmbed } = require("../../utils/ccEmbed-utils")
const { checkModLogs } = require("../../utils/configChecker")

module.exports = {
    name: 'logs',
    description: 'Displays the logs of the specified member',
    aliases: ['cases'],
    usage: '<member>',
    category: 'moderation',
    permissions: 'MANAGE_MESSAGES',
    async run (client, message, args) {
        const modLogs = await checkModLogs(message)
        if (!modLogs) return message.channel.send({ embeds: [ccEmbed('error', 'Error', 'Oops! The moderation module is disabled because the mod logs channel is not set!')] })

        const target = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(e => { const target = undefined })

        if (!target || !args[0]) return message.channel.send('Hmm.. double check that user, it doesn\'t seem correct!')

        if (target.id === client.user.id) return message.channel.send('It\'d be a bit weird if I had logs...')

        if (target.user.bot) return message.channel.send('Bots are upstanding citizens, they don\'t have logs!')

        if (!message.member) await message.guild.members.fetch(message.author.id)

        if (target.roles.highest.id === message.member.roles.highest.id) return message.channel.send('You cannot view the logs of somebody with a higher or the same role than/as you')

        const userWarns = await warnModel.find({
            userID: target.id,
            guildID: message.guild.id
        })

        if (!userWarns?.length) return message.channel.send('This user has no warns!')

        const logs = userWarns.map((warn) => {
            const moderator = message.guild.members.cache.get(warn.moderatorID)

            return [
                `Warn Reference ID: ${warn._id}`,
                `Moderator: ${moderator ? moderator.user.tag : 'Unknown'}`,
                `Date: ${moment(warn.timestamp).format('MMMM Do YYYY')}`,
                `Reason: ${warn.reason}`,
            ].join('\n')
        }).join('\n\n')

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${target.user.tag}'s Logs`)
            .setDescription(logs)
        message.channel.send({ embeds: [embed] })

    }
}
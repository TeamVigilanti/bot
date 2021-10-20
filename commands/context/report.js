const { MessageEmbed } = require("discord.js")
const { ccEmbed } = require("../../utils/ccEmbed-utils")
const { checkReportLogs } = require("../../utils/configChecker")
const emojis = require("../../data/emojis")

module.exports = {
    name: 'ctx-report',
    type: 2,
    async contextRun (client, interaction) {
        await interaction.deferReply()

        const reportLogs = await checkReportLogs(interaction)
        if (!reportLogs) return interaction.editReply({ embeds: [ccEmbed('error', 'Error', 'Oops! The report module is disabled because the report logs channel is not set!')] })

        let user = await client.users.fetch(interaction.targetId)

        if (!user) return interaction.editReply({ embeds: [ccEmbed('error', "Error", "Please specify a user to report")] })

        const member = await interaction.guild.members.fetch(user.id)

        interaction.member ??= await interaction.guild.members.fetch(interaction.user.id)

        if (user.bot) return interaction.channel.send({ content: `${emojis.kek} The bot's are harmless, I promise. (You can't report a bot silly)` })
        if (user.id === interaction.user.id) return interaction.channel.send({ content: `You can't report yourself! ${emojis.kek}` })
        //if (member.roles.highest.id === interaction.member.roles.highest.id || member.roles.highest.id === interaction.guild.me.roles.highest.id) return interaction.editReply({ content: 'No can-do chief, either the user you are trying to report has a higher role than you, or they have a higher role than me!' })

        let askForReasonMsg = await interaction.user.send({
            embeds: [ccEmbed('success', 'Report Heard!', `Hey! Please specify a reason why you want to report \`${user.tag}\` in ${interaction.guild.name}!`).setFooter('If you feel like you reported by mistake, simply ignore this message or run \`cancel\` to cancel!')]
        }).catch(() => { })

        if (!askForReasonMsg) return interaction.editReply({ embeds: [ccEmbed('error', 'Failed To Report!', 'This action requires turning DMs on!')]})
        await interaction.editReply('Check DMs!')

        const filter = m => m.author.id === interaction.user.id

        const reasonCollector = await askForReasonMsg.channel.awaitMessages({
            filter,
            time: 20000,
            max: 1,
            errors: ['time']
        }).then(collected => {
            const userReply = collected.first()

            if (userReply.content.toLowerCase() === 'cancel') return userReply.channel.send({ embeds: [ccEmbed('success', 'Cancelled!', 'Your report has been successfully canceled!')] })

            let reportChannel = interaction.guild.channels.cache.get(reportLogs)

            let reportEmbed = new MessageEmbed()
                .setTitle("Report")
                .setColor("#ff0000")
                .setDescription(`**Reported User:** ${user} (${user.id})\n**Reported By:** ${interaction.user.tag} (${interaction.user.id})\n**Reason:** ${userReply.content}`)
                .setTimestamp()

            reportChannel.send({ embeds: [reportEmbed] })
                .then(() => {
                    userReply.channel.send({ embeds: [ccEmbed('success', 'Report Sent!', 'Your report has successfully reached staff!')]})
                })
                .catch(() => {
                    userReply.channel.send({ embeds: [ccEmbed('error', 'Report Unsuccessful!', 'Your report has not been reached! Contact staff to get it resolved!')]})
                })
        }).catch(() => {
            return askForReasonMsg.reply({ embeds: [ccEmbed('error', 'Timed Out!', 'This report has automatically been cancelled because you failed to give reason on time!')] })
        })

    }
}
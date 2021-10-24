const { ccEmbed } = require("../../utils/ccEmbed-utils")
const { getMutedRole } = require("../../utils/db/muted-role-utils");
const { checkModLogs } = require("../../utils/configChecker")

module.exports = {
    name: 'unmute',
    description: 'Unmutes the specified member',
    aliases: ['um'],
    usage: '[member]',
    category: 'moderation',
    permissions: 'MANAGE_ROLES',
    async run (client, message, args) {
        const modLogs = await checkModLogs(message)
        if (!modLogs) return message.channel.send({ embeds: [ccEmbed('error', 'Error', 'Oops! The moderation module is disabled because the mod logs channel is not set!')] })
        const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(e => { const member = undefined })

        if (!member || !args[0]) {
            const errEmbed = ccEmbed('error', 'Member not found!', 'Please specify a valid member')

            return message.channel.send({ embeds: [errEmbed]})
        }

        const mutedRole = await getMutedRole(message.guild.id)

        if (!member.roles.cache.get(mutedRole.id)) {
            const errEmbed = ccEmbed('error', 'Member Not Muted!', 'This member is not muted!')

            return message.channel.send({ embeds: [errEmbed] })
        }

        member.roles.remove(mutedRole.id)
            .then(() => {
                const unmuteEmbed = ccEmbed('success', 'Member Successfully Unmuted!', `Member <@${member.id}> has been unmuted!`)
                const unmutedUserEmbed = ccEmbed('success', 'Unmuted!', `You have been unmuted from ${message.guild.name}!`)

                message.channel.send({ embeds: [unmuteEmbed] })

                member.user.send({ embeds: [unmutedUserEmbed] }).catch(e => console.log('Cannot DM User'))
            })
            .catch(e => {
                return message.channel.send({ embeds: [ccEmbed('error', 'Unable to unmute user!', 'The bot is unable to unmute this user!')] })
            })
    }
}
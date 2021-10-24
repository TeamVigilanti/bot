const { ccEmbed } = require("../../utils/ccEmbed-utils")
const { checkModLogs } = require("../../utils/configChecker")

module.exports = {
    name: 'unban',
    description: 'Unbans the specified member',
    aliases: ['ub', 'unyeet', 'yesbebis'],
    usage: '<member>',
    category: 'moderation',
    permissions: 'BAN_MEMBERS',
    async run (client, message, args) {
        const modLogs = await checkModLogs(message)
        if (!modLogs) return message.channel.send({ embeds: [ccEmbed('error', 'Error', 'Oops! The moderation module is disabled because the mod logs channel is not set!')] })
        const user = await client.users.fetch(args[0]).catch(e => { const user = undefined })
        
        if (!user || !args[0]) {
            const errEmbed = ccEmbed('error', 'User Not Found!', 'This user does not seem to exist, or is not in the bot\'s cache!')

            return message.channel.send({ embeds: [errEmbed] })
        }

        const bannedUser = await message.guild.bans.fetch(args[0]).catch(e => { const bannedUser = undefined })

        if (!bannedUser) {
            const errEmbed = ccEmbed('error', 'User Not Banned!', 'This user does seem to exist, but is not banned!')

            return message.channel.send({ embeds: [errEmbed] })
        }

        console.log(bannedUser.user.id)

        newreason = `[Ban initiated by ${message.author.tag}] | ${reason}`
        message.guild.members.unban(bannedUser.user.id, {reason: newreason})
            .then(() => {
                const unBanEmbed = ccEmbed('success', 'User Unbanned!', `User \`${bannedUser.user.username}\` has been unbanned!`)
                const unBanUserEmbed = ccEmbed('success', 'Unbanned!', `You have been unbanned from ${message.guild.name}!`)
                
                message.channel.send({ embeds: [unBanEmbed] })
                bannedUser.user.send({ embeds: [unBanUserEmbed] }).catch(e => console.log('Cannot DM user'))
            })
            .catch(e => {
                return message.channel.send({ embeds: [ccEmbed('error', 'Unable to unban user!', 'The bot is unable to unban this user!')] })
            })
    }
}
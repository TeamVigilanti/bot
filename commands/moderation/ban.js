const ms = require("ms")
const { ccEmbed } = require("../../utils/ccEmbed-utils")
const emojis = require("../../data/emojis")
const { checkModLogs } = require("../../utils/configChecker")

module.exports = {
    name: 'ban',
    description: 'bans the user',
    aliases: ['yeet', 'eliminate', 'nobebis'],
    usage: '<member> [time: {s, m, h, d} default: perm] [reason]',
    category: 'moderation',
    permissions: 'BAN_MEMBERS',
    async run (client, message, args) {
        const modLogs = await checkModLogs(message)
        if (!modLogs) return message.channel.send({ embeds: [ccEmbed('error', 'Error', 'Oops! The moderation module is disabled because the mod logs channel is not set!')] })

        //the member that the user is trying to ban
        const target = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(e => { const target = undefined })
        
        //if the target is not found
        if (!target || !args[0]) return message.channel.send('Please provide a valid user to ban')
        
        if (target.id === message.author.id) return message.channel.send('I am afraid that you cannot ban yourself..')

        if (target.id === client.user.id) return message.channel.send(`You're gonna ban me? **Nice try sucker ${emojis.kek}**`)

        if (!message.member) await message.guild.members.fetch(message.author.id)

        if (target.roles.highest.id === message.member.roles.highest.id || target.roles.highest.id === message.guild.me.roles.highest.id) return message.channel.send('The member you are trying to ban has the same role as you/me!')

        let time
        if (args[1]) time = ms(args[1])

        let reason = (isNaN(time) ? args.slice(1).join(' ') : args.slice(2).join(' ')) || 'No Reason Specified'

        const banEmbed = ccEmbed('success', 'User Banned Successfully!')
            .addField('Banned User', `${target.user.tag} (${target.id})`)
            .addField('Reason', reason)
            .setColor(0xFFFF00)
        
        const banUserEmbed =  ccEmbed('error', 'Banned!', `You have been banned from ${message.guild.name}!`)
            .addField('Reason', reason)

        if (!isNaN(time)) {
            banEmbed.addField('Duration', `${ms(time)}`)
            banUserEmbed.addField('Duration', `${ms(time)}`)
        }

        const targetId = target.id

        
        newreason = `[Ban initiated by ${message.author.tag}] | ${reason}`
        target.ban({reason: newreason})
            .then(() => {
                message.channel.send({ embeds: [banEmbed] })
                target.user.send({ embeds: [banUserEmbed] }).catch(err => {
                    console.log('Can\'t DM this user')
                })
            }).catch(e => {
                console.log(e)
                return message.channel.send({ embeds: [ccEmbed('error', 'Unable to ban user!', '*This could be down to a multitude of reasons..*')] })
            })

        if (!isNaN(time)) {
            setTimeout(async () => {
                const found = await message.guild.bans.fetch(targetId).catch(e => console.log('Ban does not exist'))
                console.log(found)
                if (found) {
                    newreason = `[CrowdControl Auto Unban] | Ban expired.`
                    message.guild.members.unban({targetId, reason:newreason})
                        .then(() => {
                            const unBanEmbed = ccEmbed('success', 'Unbanned!', `You have been unbanned from ${message.guild.name}`)

                            try{
                                found.user.send({ embeds: [unBanEmbed] }).catch(e => console.log('Cannot DM user'))
                            } catch(e) {
                                console.log('Cannot DM user')
                            }
                        })
                        .catch(e => console.log('Unable to unban user'))
                }
            }, time)
        }
    }
}

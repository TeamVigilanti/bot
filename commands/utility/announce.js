const { ccEmbed } = require("../../utils/ccEmbed-utils")

module.exports = {
    name: 'announce',
    description: 'Announce a message in a specific announcement channel',
    aliases: ['ann'],
    usage: '<channel {optional if channel \'announcements\' exists} <message>',
    category: 'utility',
    permissions: 'ADMINISTRATOR',
    run (client, message, args) {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === 'announcements')

        if (!channel) {
            const errEmbed = ccEmbed('error', 'Announcement Channel Not Found!', 'Please either create a channel named `announcements` or specify a channel!')

            return message.channel.send({ embeds: [errEmbed] })
        }

        const said = !message.guild.channels.cache.get(args[0]) ? args.join(' ') : args.slice(1).join(' ')

        const announcement = ccEmbed('success', 'Announcement!', said)
            .setFooter(message.author.id)
            .setTimestamp()

        channel.send({ embeds: [announcement] })
            .then(() => {
                const successEmbed = ccEmbed('success', 'Announcement Sent!', `Announcement has been successfully sent in <#${channel.id}>!`)

                message.channel.send({ embeds: [successEmbed] })
            })
            .catch(e => {
                const errEmbed = ccEmbed('error', 'Failed To Send Announcement', 'I might not have perms to send msgs there!')

                return message.channel.send({ embeds: [errEmbed] })
            })
    }
}
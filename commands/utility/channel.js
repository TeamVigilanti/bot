const { MessageEmbed } = require("discord.js")
const { ccEmbed } = require("../../utils/ccEmbed-utils")

module.exports = {
    name: 'channel',
    description: 'creates/deletes a channel',
    aliases: ['ch'],
    usage: '<-add | -delete> <channel name | channel ID>',
    category: 'utility',
    permissions: ['MANAGE_CHANNELS'],
    async run (client, message, args) {
        switch (args[0]) {
            case '-add':
                const channelName = args.slice(1).join(' ')
                
                if (!channelName) {
                    const errEmbed = ccEmbed('error', 'Channel Name Undefined!', 'Please specify a valid channel name!')

                    return message.channel.send({embeds: [errEmbed]})
                }

                message.guild.channels.create(channelName, {
                    parent: message.channel.parent
                }).then((channel) => {
                    const embed = ccEmbed('success', 'Channel Created!', `Channel <#${channel.id}> has been successfully created!`)

                    return message.channel.send({embeds: [embed]})
                })
                break
            case '-delete':
                const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])

                if (!channel || !args[1]) {
                    const errEmbed = ccEmbed('error', 'Channel Not Found!', 'Please specify a valid channel mention or id')
                    
                    return message.channel.send({embeds: [errEmbed]})
                }

                const embed = ccEmbed('success', 'Channel Deleted!', `Channel \`${channel.name}\` has been successfully deleted!`)

                channel.delete().then(() => message.channel.send({embeds: [embed]}))
                break
            default:
                const errEmbed = ccEmbed('error', 'Invalid Flag!', 'Please use `-add` or `-delete` to use this command!')

                return message.channel.send({embeds: [errEmbed]})
                break
        }
    }
}
const { MessageEmbed } = require('discord.js')
const { ccEmbed } = require('../../utils/ccEmbed-utils')

module.exports = {
    name: 'ping',
    description: 'Ping!',
    aliases: ['test'],
    category: 'botinfo',
    run (client, message, args) {
        message.channel.send('Pinging...')
            .then(m => {
                const latency = m.createdTimestamp - message.createdTimestamp
                const apiLatency = Math.round(client.ws.ping)
                
                // const embed = new MessageEmbed()
                //     .setTitle('<:CrowdControl_Tick:887599870024761434> Pong!')
                //     .addField('Latency', `\`${latency}\`ms`)
                //     .addField('API Latency', `\`${apiLatency}\`ms`)
                //     .setFooter(message.author.id)
                //     .setTimestamp()
                //     .setColor(0xFFFF00)

                const embed = ccEmbed('success', 'Pong!')
                    .addField('Latency', `\`${latency}\`ms`)
                    .addField('API Latency', `\`${apiLatency}\`ms`)
                    .setFooter(message.author.id)
                    .setTimestamp()
                
                m.edit({content: null, embeds: [embed]})
            })
    },
    async slashRun(client, interaction) {
        await interaction.deferReply()
        
        const initialInteraction = await interaction.editReply('Pinging...')
                
        const latency = initialInteraction.createdTimestamp - interaction.createdTimestamp
        const apiLatency = Math.round(client.ws.ping)

        const embed = ccEmbed('success', 'Pong!')
            .addField('Latency', `\`${latency}\`ms`)
            .addField('API Latency', `\`${apiLatency}\`ms`)
            .setFooter(interaction.user.id)
            .setTimestamp()
                
        await interaction.editReply({content: null, embeds: [embed]})
    }
}
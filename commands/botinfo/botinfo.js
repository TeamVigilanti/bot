const { MessageButton, MessageActionRow } = require("discord.js")
const { ccEmbed } = require("../../utils/ccEmbed-utils")
const config = require("../../config.json")

module.exports = {
    name: 'botinfo',
    description: 'Sends info of CrowdControl',
    aliases: ['bi'],
    category: 'botinfo',
    run (client, message, args) {
        const embed = ccEmbed(
            'success', 
            'CrowdControl Info', 
            'CrowdControl is an automoderation and server management Discord bot currently in closed alpha. For now it\'ll be available for close friends of the developer and will later be released for general usage!'
        )
            .addField('Developers', 'Codeize#0001')
            .addField('Version', 'V0 Dev')
            .addField('Contributors', 'Fad The Chad (DankML)#8516')
            .setImage(client.user.avatarURL({dynamic: true}))
        const socialComponents = new MessageActionRow().addComponents(
            new MessageButton()
                  .setLabel("Source Code")
                  .setStyle("LINK")
                  .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
            new MessageButton()
                .setLabel("Invite")
                .setStyle("LINK")
                .setURL(config.invite),
            new MessageButton()
                .setLabel("Support Server")
                .setStyle("LINK")
                .setURL("https://discord.gg/b5YUXMAex7"),
            );
        message.channel.send({ embeds: [embed], components: [socialComponents] })
    }
}
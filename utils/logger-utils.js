// eventName: (eventArgs) => { [event logged embed, guildId] }

const { MessageEmbed } = require("discord.js");

const logger = {
    messageDelete: (message) => {
        return [new MessageEmbed().setTitle('Message Deleted').addField('Message', message.content).addField('Author', `${message.author.tag} (${message.author.id})`), message.guild.id]
    },
    messageUpdate: (oldMsg, newMsg) => {
        return [new MessageEmbed().setTitle('Message Edited').addField('Old', oldMsg.content).addField('new', newMsg.content), newMsg.guild.id]
    }
}

module.exports = logger
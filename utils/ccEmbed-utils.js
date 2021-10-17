const { MessageEmbed } = require("discord.js")

module.exports = {
    /** 
     * A custom MessageEmbed function for CrowdControl
     * @param {string} [type] - The type of embed (success | error)
     * @param {string} title - The embed's title
     * @param {string} [description] - The embed's description
     * @returns {object} - The MessageEmbed
    */
    ccEmbed: (type, title, description) => {
        const embed = new MessageEmbed()

        let emoji = ''
        let color = 0xFFFFFF

        if (type === 'success') {
            emoji = ':ok_hand:'
            color = 0xFFFF00
        } else if (type == 'error') {
            emoji = ':x:'
            color = 0x0000FF
        }

        embed.setTitle(`${emoji} ${title}`)
        if (description) embed.setDescription(description)
        embed.setColor(color)

        return embed
    }
}
const { MessageEmbed } = require('discord.js');
const { isModLogs, isReportLogs, isPrivateVC, pullReportLogsID, pullModLogsID, pullPrivateVC } = require('../../utils/configSettingsHelper');
const emojis = require("../../data/emojis")

module.exports = {
    name: 'checker',
    description: 'Checks config settings!',
    aliases: [''],
    usage: '',
    category: 'config',
    permissions: 'MANAGE_ROLES',
    async run (client, message, args) {
        const pulledModLogs = await pullModLogsID(message)
        const pulledReportLogs = await pullReportLogsID(message)
        const pulledPrivateVC = await pullPrivateVC(message)
        const embed = new MessageEmbed()
            .setTitle(`${message.guild.name}'s Config Settings'`)
            .setColor(0x00AE86)
            .setDescription(`**Report Logs:** ${await isReportLogs(message) ? `${emojis.online} Enabled, <#${pulledReportLogs}>` : `${emojis.outage} Disabled, set it up via \`{prefix}setlogs reportlogs <channel id>\``}
            \n**Mod Logs:** ${await isModLogs(message) ? `${emojis.online} Enabled, <#${pulledModLogs}>` : `${emojis.outage} Disabled, set it up via \`{prefix}setlogs modlogs <channel id>\``}
            \n**Private Voice Channel:** ${await isPrivateVC(message) ? `${emojis.online} Enabled, <#${pulledPrivateVC}>` : `${emojis.outage} Disabled, set it up via \`{prefix}setprivatevc vc <voice channel id>\``}`
        );
        message.channel.send({ embeds: [embed] });
    }
}
const { MessageEmbed } = require('discord.js');
const { 
    isModLogs, isReportLogs, isPrivateVC, isVerifyRole, isVerifyChannel, 
    pullReportLogsID, pullModLogsID, pullPrivateVC, pullVerifyRole, pullVerifyChannel 
} = require('../../utils/configSettingsHelper');
const emojis = require("../../data/emojis")

module.exports = {
    name: 'checker',
    description: 'Checks config settings!',
    aliases: [],
    usage: '',
    category: 'config',
    permissions: 'MANAGE_ROLES',
    async run (client, message, args) {
        const pulledModLogs = await pullModLogsID(message)
        const pulledReportLogs = await pullReportLogsID(message)
        const pulledPrivateVC = await pullPrivateVC(message)
        const pulledVerifyRole = await pullVerifyRole(message)
        const pulledVerifyChannel = await pullVerifyChannel(message)
        const embed = new MessageEmbed()
            .setTitle(`${message.guild.name}'s Config Settings'`)
            .setColor(0x00AE86)
            .setDescription(
            `
            **Report Logs:**\n${await isReportLogs(message) ? `${emojis.online} Enabled, <#${pulledReportLogs}>` : `${emojis.outage} Disabled, set it up via \`{prefix}setlogs reportlogs <channel id>\``}
            \n**Mod Logs:**\n${await isModLogs(message) ? `${emojis.online} Enabled, <#${pulledModLogs}>` : `${emojis.outage} Disabled, set it up via \`{prefix}setlogs modlogs <channel id>\``}
            \n**Private Voice Channel:**\n${await isPrivateVC(message) ? `${emojis.online} Enabled, <#${pulledPrivateVC}>` : `${emojis.outage} Disabled, set it up via \`{prefix}setprivatevc vc <voice channel id>\``}
            \n
            \n***Verification Settings...***
            \n
            \n**Verify Role:**\n${await isVerifyRole(message) ? `${emojis.online} Enabled, <@&${pulledVerifyRole}>` : `\n${emojis.outage} Disabled, set it up via \`{prefix}setprivatevc vc <voice channel id>\``}
            \n**Verify Notify Channel:**\n${await isVerifyChannel(message) ? `${emojis.online} Enabled, <#${pulledVerifyChannel}>` : `\n${emojis.outage} Disabled, set it up via \`{prefix}setprivatevc vc <voice channel id>\``}
            `
        );
        message.channel.send({ embeds: [embed] });
    }
}
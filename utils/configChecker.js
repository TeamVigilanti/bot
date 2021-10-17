const { getModLogs } = require("./db/modLogs");
const { getReportLogs } = require("./db/reportLogs");
const { getPrivateVC } = require("./db/privateVC");
const { ccEmbed } = require("./ccEmbed-utils");

module.exports = {
  name: "configchecker",
  description: "Check the config of the server, when executing particular commands!",

  checkReportLogs: async (message) => {
    const logs = await getReportLogs(message.guild.id);
    
    return logs ? logs : null
  },

  checkPrivateVC: async (guild) => {
    const logs = await getPrivateVC(guild.id);
    
    return logs || null;
  },

  checkModLogs: async (message) => {
    const logs = await getModLogs(message.guild.id);
    
    if (logs) {
        return message.channel.send({ content: "bueno" });
    } else {
        const embed = ccEmbed('error', 'Channel Not Found!', 'Oops! No mod logs channel can be found in our database for this guild, as a result, this command is disabled.')
        
        return message.channel.send({ embeds: [embed] })
    }
  },
}
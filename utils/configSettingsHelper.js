const { getModLogs } = require("./db/modLogs");
const { getReportLogs } = require("./db/reportLogs");
const { getPrivateVC } = require("./db/privateVC");
const { ccEmbed } = require("./ccEmbed-utils");

module.exports = {
  name: "configsettingshelper",
  description: "Helper functions for the config checker command!",

  isReportLogs: async (message) => {
    const logs = await getReportLogs(message.guild.id);
    if (logs) {
        return true;
    } else {
        return false;
    }
  },

  isModLogs: async (message) => {
    const logs = await getModLogs(message.guild.id);
    if (logs) {
        return true;
    } else {
        return false;
    }
  },

  isPrivateVC: async (message) => {
    const channel = await getPrivateVC(message.guild.id);
    if (channel) {
        return true;
    } else {
        return false;
    }
  },

  pullReportLogsID: async (message) => {
    const logs = await getReportLogs(message.guild.id);
    if (logs) {
        return logs;
    } else {
        return null;
    }
  },

  pullModLogsID: async (message) => {
    const logs = await getModLogs(message.guild.id);
    if (logs) {
        return logs;
    } else {
        return null;
    }
  },

  pullPrivateVC: async (message) => {
    const channel = await getPrivateVC(message.guild.id);
    if (channel) {
        return channel;
    } else {
        return null;
    }
  },

}
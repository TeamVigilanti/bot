const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const { ccEmbed } = require("../../utils/ccEmbed-utils")
const config = require("../../config.json")
const Os = require('os');

module.exports = {
    name: 'stats',
    description: 'Sends nerd stats for CrowdControl',
    aliases: [''],
    category: 'botinfo',
    async run (client, message, args) {
        const UpSec = (client.uptime / 1000);
        const Days = Math.floor(UpSec / 86400);
        const Hours = Math.floor(UpSec / 3600);
        const Minutes = Math.floor(UpSec / 60);
        const Seconds = Math.floor(UpSec % 60);
        const Uptime = `${Days} Days, ${Hours} Hours, ${Minutes} Minutes & ${Seconds} Seconds`;
        const MemoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        const RamUsed = Math.round(process.cpuUsage().system) / 1024;
        const RamUsage = Math.trunc(RamUsed);
        const BotPlatform = process.platform;
        const MemoryUsed = Math.trunc(MemoryUsage);
        const OsHostName = Os.hostname();
        const SystemPing = Math.round(client.ws.ping);
        const statsEmbed = new MessageEmbed()
            .setColor('#b700ff')
            .setTitle("Bot's Live Status")
            .addField(" \u200B ", "**Bot Uptime** : ` " + `${Uptime}` + " `")
            .addField(" \u200B ", "** Bot's Host Name** :  ` " + OsHostName + " `")
            .addField(" \u200B ", "**Bot Current Version** : ` " + config.version + " `")
            .addField(" \u200B ", "**Global Bot Prefix** : ` " + config.prefix + " `")
            .addField(" \u200B ", "**Memory Usage** :  ` " + MemoryUsed + "Mb `")
            .addField(" \u200B ", "**Bot Platform** :  ` " + BotPlatform + " `")
            .addField(" \u200B ", "**System Ping** :  ` " + SystemPing + " `")
            .addField(" \u200B ", "**Channels** : ` " + `${client.channels.cache.size}` + " `")
            .addField(" \u200B ", "**Servers** : ` " + `${client.guilds.cache.size}` + " `")
            .addField(" \u200B ", "**Users** : ` " + `${client.users.cache.size}` + " `")
        message.channel.send({ embeds: [statsEmbed], });
    }
}
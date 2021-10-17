const backup = require("discord-backup");
const { ccEmbed } = require("../../utils/ccEmbed-utils");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'backupinfo',
    description: 'Get some info on your server backup!',
    aliases: [''],
    usage: '',
    category: 'channels',
    permissions: 'ADMINISTRATOR',
    run (client, message, args) {
        let backupID = args[0];
        if(!backupID){
            return message.channel.send(":x: | You must specify a valid backup ID!");
        }
        backup.fetch(backupID).then((backupInfos) => {
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
            let embed = new MessageEmbed()
                .setAuthor("Backup Informations")
                .addField("Backup ID", backupInfos.id, false)
                .addField("Server ID", backupInfos.data.guildID, false)
                .addField("Size", `${backupInfos.size} kb`, false)
                .addField("Created at", formatedDate, false)
                .setColor("#FF0000");
            message.channel.send({ embeds: [embed] });
        }).catch((err) => {
            console.log(err);
            // if the backup wasn't found
            return message.channel.send(":x: | No backup found for the provided backup ID!");
        });
    }
}
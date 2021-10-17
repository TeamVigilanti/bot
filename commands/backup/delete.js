const backup = require("discord-backup");
const { ccEmbed } = require("../../utils/ccEmbed-utils");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'backupdelete',
    description: 'Delete your server backup!',
    aliases: [''],
    usage: '',
    category: 'channels',
    permissions: 'ADMINISTRATOR',
    run (client, message, args) {
        let backupID = args[0];
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(ccEmbed('error', 'Missing Administrator', 'You do not have the required permissions to use this command!'));
                
        backup.fetch(backupID).then(async () => {
            backup.remove(backupID).then(() => {
                message.channel.send(":white_check_mark: | Backup successfully deleted!");
            }).catch((err) => {
                return message.channel.send(":x: | Oh no, an error occurred! Please check that I have administrator permissions!");
            });
        }).catch((err) => {
            console.log(err);
            return message.channel.send(`:x: | No backup found for the provided backup ID!`);
        });
    }
}
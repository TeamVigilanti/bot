const backup = require("discord-backup");
const { ccEmbed } = require("../../utils/ccEmbed-utils");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'backupload',
    description: 'Load your server backup!',
    aliases: [''],
    usage: '',
    category: 'channels',
    permissions: 'ADMINISTRATOR',
    async run (client, message, args) {
        let backupID = args[0];
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(ccEmbed('error', 'Missing Administrator', 'You do not have the required permissions to use this command!'));
                
        if(!backupID){
            return message.channel.send(":x: | That backup ID doesn't look correct!");
        }

        backup.fetch(backupID).then(async () => {
            message.channel.send(":warning: | When the backup is loaded, all the channels, roles, etc. will be deleted with no trace! Type `cc!confirm` to authorize this action!");
            try {
                message.author.send(":white_check_mark: | Hang tight! This is gonna take a bit..");
            } catch(err) {
                console.log(err);
            }
            backup.load(backupID, message.guild).then(() => {
                backup.remove(backupID);
            }).catch((err) => {
                console.log(err);
                return message.author.send(":x: | Oh no, an error occurred! Please check that I have administrator permissions!");
            });
        }).catch((err) => {
            console.log(err);
            return message.channel.send(`:x: | No backup found for the provided backup ID!`);
        });
    }
}
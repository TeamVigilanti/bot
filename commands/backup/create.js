const backup = require("discord-backup");
const { ccEmbed } = require("../../utils/ccEmbed-utils");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'backupcreate',
    description: 'Create your server backup!',
    aliases: [''],
    usage: '',
    category: 'channels',
    permissions: 'ADMINISTRATOR',
    run (client, message, args) {
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(ccEmbed('error', 'Missing Administrator', 'You do not have the required permissions to use this command!'));
                
        backup.create(message.guild, {
            jsonBeautify: true
        }).then((backupData) => {
            try{
                message.author.send(`The backup has been created! To load it, run: \`load ${backupData.id} \`!`);
                message.channel.send(":white_check_mark: Backup successfully created. The backup ID was sent in your DMs!");
            } catch(err) {
                message.channel.send("Oops! Please enable your DMs and run this command again so I can DM you your backup code!")
            }
        });
    }
}
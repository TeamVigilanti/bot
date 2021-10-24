const ms = require("ms")
const { ccEmbed } = require("../../utils/ccEmbed-utils")
const { checkModLogs } = require("../../utils/configChecker")

module.exports = {
    name: 'lockdown',
    description: 'Lockdown the server',
    usage: '',
    category: 'moderation',
    permissions: 'MANAGE_CHANNELS',
    async run (client, message, args) {
        const modLogs = await checkModLogs(message)
        if (!modLogs) return message.channel.send({ embeds: [ccEmbed('error', 'Error', 'Oops! The moderation module is disabled because the mod logs channel is not set!')] })

        const userPermEmbed = ccEmbed('error', 'Permission Error', "You do not have the required permissions to use this command")
        if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.channel.send({ embeds: [userPermEmbed] })
        
        const botPermEmbed = ccEmbed('error', 'Permission Error', "I do not have the required permissions to use this command")
        if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.channel.send({ embeds: [botPermEmbed] })

        const role = message.guild.roles.everyone;

        if (!args.length) return message.reply("Please specify a query");

        const query = args[0].toLowerCase();
        if (!["true", "false"].includes(query))
            return message.reply("The option you have stated is not valid!");
  
        const perms = role.permissions.toArray();
        if (query === "false") {
            perms.push("SEND_MESSAGES");
            console.log(perms)
            await role.edit({ permissions: perms, reason: `[CrowdControl Lockdown] Initiated by ${message.author.tag}` });
            message.channel.send(`Entering lockdown grace period, please allow a moment for everything to return to normal!`);
        } else {
            const newPerms = perms.filter((perm) => perm !== 'SEND_MESSAGES');
            console.log(newPerms);
            await role.edit({ permissions: newPerms, reason: `[CrowdControl Lockdown] Lockdown ended by ${message.author.tag}` });
            message.reply(`Server is now locked down. You are not muted!`)
        }

    }
}
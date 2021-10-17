const { MessageEmbed } = require('discord.js')
const config = require('../config.json')
const { ccEmbed } = require('../utils/ccEmbed-utils')
const { prefix, devs, supportServer } = config

module.exports = {
    name: 'messageCreate',
    run (message, client) {
        if (message.content.match(new RegExp('^<@!?' + client.user.id + '>'))) return message.reply(`My prefix is \`${prefix}\`\nHowever, CrowdControl will fully be moving to slash commands in the not so distant future!`)
        
        if (!message.content.startsWith(prefix) || message.author.bot) return
            
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()
        
        // get the command through the command name, or one of the aliases of the command
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && (typeof cmd.aliases === 'string' ? commandName === cmd.aliases : cmd.aliases.includes(commandName)))
        
        //if the command does not exist, we can simply ignore
        if (!command) return

        if (command.permissions) {
            let { permissions } = command
                
            if ((permissions === 'BOT_DEV' || command.category === 'dev') && !devs.includes(message.author.id)) return
            
            if (typeof permissions === 'string') permissions = [permissions]
        
            for (const permission of permissions)  {
                const permErrEmbed = ccEmbed('error', 'Invalid Permissions!')
                
                if (!message.member.permissions.has(permission)) {
                    permErrEmbed.setDescription('You don\'t have perms to run this command!')
                    return message.channel.send({embeds: [permErrEmbed]})
                }
                
                if (!message.guild.me.permissions.has(permission)) {
                    permErrEmbed.setDescription('I don\'t have perms to run this command!')
                    return message.channel.send({embeds: [permErrEmbed]})
                }
            }
        
        }
        try {
            command.run(client, message, args)
            console.log(`\nCommand Ran!\nCommand: ${command.name}\nUser: ${message.author.username}\nGuild: ${message.guild ? message.guild.name : 'None'}\n`)
            cmdlogs = client.channels.cache.get(config.cmdLogs)
            if (cmdlogs) {
                embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Command Ran!`)
                    .setDescription(`Command: ${command.name}\nUser: ${message.author.username}\nGuild: ${message.guild ? message.guild.name : 'None'}`)
                cmdlogs.send( {embeds: [embed]} )
                
                    
            } else {
                console.log('Command Logs channel not found, set it dumbass!')
            }
        }
        catch (err) {
            console.error(`\nThere was an error running the command ${command.name}!\nError: ${err}`);
            
            // You don't realize how many times i see this embed everyday
            const errEmbed = ccEmbed(
                'error',
                'Error!', 
                `Oopsie doopsie!\nif you\'re seeing this message, our systems detect something went wrong while running a command, please report this issue in the ${supportServer}`
            )
                
            message.channel.send({embeds: [errEmbed]})
        }
    }   
}
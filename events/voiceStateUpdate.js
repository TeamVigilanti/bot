const { Collection } = require('discord.js')
const voiceCollection = new Collection()
const { ccEmbed } = require("../utils/ccEmbed-utils")
const { checkPrivateVC } = require("../utils/configChecker")

module.exports = {
    name: 'voiceStateUpdate',
    async run (oldState, newState, client) {
        console.log('test')
        
        const privateVC = await checkPrivateVC(newState.guild)
        if (!privateVC) return
    
        console.log(privateVC)
    
        const member = await newState.guild.members.fetch(newState.member.id);
    
        if (!oldState.channel && newState.channel.id === `${privateVC}`) {
            const channel = await newState.guild.channels.create(member.user.tag, {
                type: 'GUILD_VOICE',
                parent: newState.channel.parent,
            })
            member.voice.setChannel(channel);
            voiceCollection.set(member.user.id, channel.id);
        } else if(!newState.channel) {
            
            if(oldState.channelId === voiceCollection.get(newState.id)) {
                return oldState.channel.delete();
            }
        }
    }
}
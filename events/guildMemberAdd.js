const { Captcha } = require('captcha-canvas')
const { MessageEmbed, MessageAttachment, GuildMemberManager } = require('discord.js')
const { getVerifyRole } = require("../utils/db/verification");
const { isVerifyRole, isVerifyChannel, pullVerifyRole, pullVerifyChannel } = require('../utils/configSettingsHelper');

module.exports = {
    name: 'guildMemberAdd',
    async run (member, client) {
        // const pulledVerifyRole = await pullVerifyRole(member)
        // const pulledVerifyChannel = await pullVerifyChannel(member)

        // console.log("ok 1")

        // const captcha = new Captcha()
        // captcha.async = true
        // captcha.addDecoy()
        // captcha.drawTrace()
        // captcha.drawCaptcha()

        // const captchaEmbed = new MessageEmbed()
        //     .setColor('#0099ff')
        //     .setTitle('Captcha')
        //     .setDescription('Please type the captcha below to verify that you are a human and gain access to the server.')
        //     .setImage('attachment://captcha.png')

        // const captchaAttachment = new MessageAttachment(
        //     await captcha.png,
        //     'captcha.png'
        // )
        // console.log("ok 2")
        // const msg = await member.send({
        //     files: [captchaAttachment],
        //     embeds: [captchaEmbed]
        // })
        // console.log("ok 3")
        // const filter = (message) => {
        //     if(!message.author.id === member.id) return
        //     if(message.content === captcha.text) return true
        //     else member.send('Incorrect captcha, please try again.')
        // }
        // try {
        //     console.log("ok 4")
        //     const response = await msg.channel.awaitMessages({ filter: filter, max: 1, time: 30000 , errors: ['time'] })

        //     if(response) {
        //         const role = member.guild.cache.roles.get(pulledVerifyRole)
        //         member.roles.add(role)
        //         member.send('You have been passed verification and have been granted access to the server..')
        //     }
        // } catch(e) {
        //     member.send('Captcha timed out, please try again.')
        //     member.kick({ reason: '[CrowdControl Verification] Captcha timed out' })
        // }
    }
}
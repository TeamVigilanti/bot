import { CommandInteraction, MessageEmbed } from "discord.js";
import Command from "../../Types/Command";

export default class AboutCommand extends Command {
    public constructor(){
        super({
            name: "about",
            description: "Sends a nice formatted embed!",
            category: "About",
            devOnly: false
        })
    }

    async run (int:CommandInteraction){
        let embed = new MessageEmbed()
        .setTitle("About CrowdContrl")
        .setDescription("CrowdContrl is a Discord bot that allows you to control your server's moderation, and general server maintenance.")
        .addField("Version", process.env.version as string)
        .addField("Core Dev Team", "-  Codeize#0001\n-  Dann#7822\n-  Fad The Chad (DankML)#8516")
        .addField("Guilds", this.client?.guilds.cache.size.toString() as string, true)
        .addField("Users", this.client?.users.cache.size.toString() as string, true)
        .addField("Channels", this.client?.channels.cache.size.toString() as string, true)
        .setColor("#00ff00")
        .setThumbnail(this.client?.user?.avatarURL() as string)
        int.reply({ embeds: [embed]})
    }
}
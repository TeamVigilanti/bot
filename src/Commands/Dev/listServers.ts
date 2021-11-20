import { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Channel, TextChannel } from "discord.js";
import Command from "../../Types/Command";

export default class LeaveCommand extends Command {
    public constructor(){
        // add option for a guild
        super({
            name: "listguilds",
            description: "List all guilds Vigilanti is in.",
            category: "Dev",
            devOnly: true,
        })
    }

    async run (int:CommandInteraction){
        let guilds = await this.client!.guilds.fetch();
        let guildsEmbed = new MessageEmbed()
            .setTitle("Guilds")
            .setColor(0x00FF00)
            .setDescription("Here is a list of all guilds Vigilanti is in.");
        guilds.map((guild) => {
            guildsEmbed.addField(guild.name, guild.id);
        });
        int.reply({ embeds: [guildsEmbed] });
    }
}
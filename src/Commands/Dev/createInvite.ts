import { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Channel, TextChannel } from "discord.js";
import Command from "../../Types/Command";

export default class LeaveCommand extends Command {
    public constructor(){
        // add option for a guild
        super({
            name: "createinvite",
            description: "Try generate an invite for a specified guild.",
            category: "Dev",
            devOnly: true,
            options: [
                {
                    name: "guildid",
                    description: "The guild ID of the server of which you want VGL to leave!",
                    type: 3,
                    required: true
                }
            ]
        })
    }

    async run (int:CommandInteraction){
        let guildID = int.options.getString("guildid");
        if (!guildID) return;

        let guild = await this.client?.guilds.fetch(guildID);
        let invite = await guild!.invites.create(guild!.channels.cache.find((c: Channel) => c.type === 'GUILD_TEXT') as TextChannel, { maxAge: 0, maxUses: 0 });
        if(!invite){
            return int.reply({ content: "Could not create an invite for this guild." });
        }
        else {
            const embed = new MessageEmbed()
                .setTitle("Invite for " + guild?.name)
                .setDescription(invite.url)
                .setColor("#00ff00");
            return int.reply({ embeds: [embed] });
        }
    }
}
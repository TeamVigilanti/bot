import { CommandInteraction, MessageEmbed } from "discord.js";
import Command from "../../Types/Command";

export default class GrantPremiumCommand extends Command {
    public constructor(){
        // add option for a guild
        super({
            name: "grantpremium",
            description: "Grant premium to a guild.",
            category: "Dev",
            devOnly: true,
            options: [
                {
                    name: "guildid",
                    description: "The guild ID of the server of which you want to grant premium!",
                    type: 3,
                    required: true
                }
            ]
        })
    }

    async run (int:CommandInteraction){
        let guildID = int.options.getString("guildid");
        if (!guildID) return;

        // find guild in database
        let guild = this.client?.db.guild.findUnique({ where: { guildID: guildID } });
        if (!guild) return int.reply(`Could not find guild registered in the DB with ID: ${guildID}`);

        // set premium
        await this.client?.db.guild.update({
            where: {
                guildID: guildID
            },
            data: {
                premium: true
            }
        });
        
        
    }

        // do rest of command here
        
}
import { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import Command from "../../Types/Command";

export default class LeaveCommand extends Command {
    public constructor(){
        // add option for a guild
        super({
            name: "leave",
            description: "Makes VGL leave ALL guilds. This action is irreversible",
            category: "Dev",
            devOnly: true,
        })
    }

    async run (int:CommandInteraction){
        this.client!.guilds.cache.forEach(async g => {
                await g?.leave();
            });
    }
}
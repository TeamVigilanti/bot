import { CommandInteraction, MessageEmbed } from "discord.js";
import Command from "../../Types/Command";

export default class LeaveCommand extends Command {
    public constructor(){
        // add option for a guild
        super({
            name: "leave",
            description: "Makes CC leave a guild.",
            category: "Dev",
            devOnly: true
        })
    }

    async run (int:CommandInteraction){
        int.reply("hello - dev only");
    }
}
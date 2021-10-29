import { CommandInteraction } from "discord.js";
import Command from "../../Types/Command";

export default class PingCommand extends Command {
    public constructor(){
        super({
            name: "ping",
            description: "Sends a pong message!",
            category: "Information",
            devOnly: false
        })
    }

    async run (int:CommandInteraction){
        int.reply("Pong 🏓")

    }
}
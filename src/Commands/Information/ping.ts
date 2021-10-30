import { CommandInteraction } from "discord.js";
import Command from "../../Types/Command";
import CCEmbed from "../../Utils/CCEmbed";

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
        const embed = new CCEmbed().setProps('success', 'Pong 🏓')
        
        await int.reply({ embeds: [embed] })
    }
}
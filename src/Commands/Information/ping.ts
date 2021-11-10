import { CommandInteraction } from "discord.js";
import Command from "../../Types/Command";
import VTEmbed from "../../Utils/VTEmbed";

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
        const embed = new VTEmbed().setProps('success', 'Pong 🏓')
        
        await int.reply({ embeds: [embed] })
    }
}
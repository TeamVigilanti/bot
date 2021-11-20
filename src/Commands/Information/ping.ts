import { CommandInteraction } from "discord.js";
import Command from "../../Types/Command";
import VGLEmbed from "../../Utils/VGLEmbed";

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
        const embed = new VGLEmbed().setProps('success', 'Pong 🏓')
        
        await int.reply({ embeds: [embed] })
    }
}
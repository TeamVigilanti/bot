import { Interaction } from "discord.js";
import Event from "../../Types/Event";

export default class InteractionCreateEvent extends Event {

    public constructor(){
        super("interactionCreate");
    }

    async run(int:Interaction) {
        if (!int.inGuild()) return;
        if (int.isCommand()){
            const command = this.client?.commands.get(int.commandName);
            if (!command) return int.reply({ content: "there was an error." });

            if (!this.client?.owners.includes(int.member.user.id) && command.devOnly) return int.reply({ content: "No way! This is a developer only command! You aren't a developer though... :thinking:", ephemeral: true });

            command.run(int);
        }
    }


}
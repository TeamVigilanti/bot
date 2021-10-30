import { CommandInteraction, MessageEmbed } from "discord.js";
import Command from "../../Types/Command";

export default class LeaveCommand extends Command {
    public constructor(){
        // add option for a guild
        super({
            name: "leave",
            description: "Makes CC leave a guild.",
            category: "Dev",
            devOnly: true,
            options: [
                {
                    name: "guildid",
                    description: "The guild ID of the server of which you want cc to leave!",
                    type: 3,
                    required: true
                }
            ]
        })
    }

    async run (int:CommandInteraction){
        let guildID = int.options.getString("guildid");
        if (!guildID) return;

        // do rest of command here
        let g = await this.client?.guilds.fetch(guildID);
        if (!g) return int.reply({ content: "Couldn't find a guild with that ID!", ephemeral: true });
        g.leave().catch((err) => int.reply({ content: "There was an error leaving that server! " + err, ephemeral: true }));
        await int.reply({ content: `Successfully left ${g.name} (${g.id})`, ephemeral: true });
    }
}
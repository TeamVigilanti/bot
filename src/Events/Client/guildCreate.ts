import type { Guild } from "discord.js";
import Event from "../../Types/Event";

export default class GuildJoinEvent extends Event {
    public constructor(){
        super("guildCreate")
    }

    async run (guild:Guild){
        await this.client?.db.guild.create({
            data: {
                guildID: guild.id,
                premium: true,
                settings: {}
            }
        })
    }
}
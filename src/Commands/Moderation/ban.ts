import { CommandInteraction, GuildMember } from "discord.js";
import Command from "../../Types/Command";
import { ApplicationCommandOptionType } from "discord-api-types";

export default class BanCommand extends Command {
    public constructor(){
        super({
            name: "ban",
            description: "Ban a user!",
            category: "moderation",
            devOnly: false,
            options: [
                {
                    name: "member",
                    description: "The member you would like to ban!",
                    type: 'USER',
                    required: true, 
                },
                {
                    name: "reason",
                    description: "The reason for the ban!",
                    type: 'STRING',
                    required: false,
                },
                {
                    name: "hidden",
                    description: "Whether the message is sent into chat, or shown only to you.",
                    type: 'BOOLEAN',
                    required: false,
                },
            ]
        })
    }

    async run (int:CommandInteraction){
        let member = int!.options.getMember("member")! as GuildMember;
        let reason = int!.options.getString("reason") ?? ''

        let hid = int.options.getBoolean("hidden") ?? false;

        let caller = int.member! as GuildMember;
        if (await this.utils!.checkPermissions(int, "BAN_MEMBERS", caller, true)){
            if (member!.user.id === caller.user.id) return int!.reply({ content: "You can not ban yourself!", ephemeral: true });
            if (!member?.bannable) return int!.reply({ content: "You can not ban this member! They either have higher permissions or equal permissions to you/me!", ephemeral: true });
        }
    }
}
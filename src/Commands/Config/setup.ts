import { CommandInteraction, MessageEmbed } from "discord.js";
import Command from "../../Types/Command";

export default class GrantPremiumCommand extends Command {
    public constructor(){
        // add option for a guild
        super({
            name: "setup",
            description: "Setup Vigilanti for this server.",
            category: "Config",
            options: [
                {
                    name: "adminrole",
                    description: "The role that is allowed to use the admin commands.",
                    type: 3,
                    required: true
                },
                {
                    name: "modrole",
                    description: "The role that is allowed to use the mod commands.",
                    type: 3,
                    required: true
                },
                {
                    name: "helperrole",
                    description: "The role that is allowed to use the helper commands.",
                    type: 3,
                    required: true
                },
                {
                    name: "muterole",
                    description: "The role that is allowed to use the mute commands.",
                    type: 3,
                    required: true
                },
            ]
        });
    }

    async run (int:CommandInteraction){
        const adminRole = int.options.getString("adminrole");
        const modRole = int.options.getString("modrole");
        const helperRole = int.options.getString("helperrole");
        const muteRole = int.options.getString("muterole");

        if (!adminRole || !modRole || !helperRole || !muteRole) return;

        const embed = new MessageEmbed()
            .setTitle("Setup Complete!")
            .setDescription(`
                The following roles have been set up:
                \`\`\`
                Admin: ${adminRole}
                Mod: ${modRole}
                Helper: ${helperRole}
                Mute: ${muteRole}
                \`\`\`
            `)
            .setColor(0x00FF00);
        await int.reply({ embeds: [embed] });
        
    }
}
import CrowdControlClient from "./CrowdControlClient";
import { CommandInteraction, GuildMember, MessageEmbed, PermissionResolvable, Role } from "discord.js";
import * as commonTags from "common-tags";

export default class CrowdControlUtils {
    public client?: CrowdControlClient;

    public constructor(client:CrowdControlClient){
        this.client = client;
    }

    /**
	 * Valid URL
	 *
     * @param url the url that you want to be tested to see if its a URL
     * 
     * @returns Boolean
     * 
	 */

    public validURL(str: string ): boolean {
        let pattern = new RegExp('^(https?:\\/\\/)?'+ 
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
          '(\\#[-a-z\\d_]*)?$','i'); 
        return !!pattern.test(str);
      }

    public async checkPermissions(int: CommandInteraction, permission: PermissionResolvable | PermissionResolvable[], member: GuildMember, ephemeral: boolean = false)  {
        if(!member.permissions.has(permission)) return await int.reply({embeds: [this.NoPermissionsEmbed(permission, member) as MessageEmbed], ephemeral: ephemeral})
        return true;
    }

    /**
	 * Get Slash Commands
	 *
     * @param query the slash command that you want to find
     * 
     * @returns SlashCommand
     * 
	 */

     public NoPermissionsEmbed(permissionRequired: PermissionResolvable[] | PermissionResolvable, memberWhoTried: GuildMember): MessageEmbed {

        let embed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Not enough permission')
            .setDescription(commonTags.stripIndents`
                In order to use this command you need the permission \`${permissionRequired}\`
            `)
            .setFooter(memberWhoTried.user.tag, memberWhoTried.user.displayAvatarURL({ dynamic: true }));
    
            
        return embed;
    }

     /**
	 * Config change embed
	 *
     * @param key the setting that has been changed
     * 
	 * @param value the new value of the setting
     * @returns MessageEmbed
     * 
	 */

}
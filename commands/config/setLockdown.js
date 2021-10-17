const { setLockdownCategory } = require("../../utils/db/lockdownCategory");
const { ccEmbed } = require("../../utils/ccEmbed-utils");

module.exports = {
    name: 'setlockdown',
    description: 'Set some lockdown settings!',
    aliases: ['sld'],
    usage: '<type { catagories }> <Category>',
    category: 'config',
    permissions: 'MANAGE_ROLES',
    run (client, message, args) {
        switch (args[0]) {
            case 'catagories':
                const lockdownCategory = message.guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').get(args[1]);

                if (!lockdownCategory) {
                    const embed = ccEmbed('error', 'Category Not Found!', 'Please specify a valid Category!')

                    return message.channel.send({ embeds: [embed] })
                }

                setLockdownCategory(message.guild.id, lockdownCategory.id)

                message.channel.send({ embeds: [ccEmbed('success', 'Set lockdown Category successfully!', `Category #${lockdownCategory.name} has been set as the Category to be locked down when a lockdown is initiated for this server!`)] })
                break;
            default:
                const embed = ccEmbed('error', 'Invalid Type!', 'Please specify a valid type!\nValid types are `catagories`!')

                return message.channel.send({ embeds: [embed] })
        }
    }
}
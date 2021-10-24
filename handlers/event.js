const fs = require('fs')
const logger = require('../utils/logger-utils.js')
const { getModLogs } = require("../utils/db/modLogs");

module.exports = (client) => {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
    console.log('\nLoading events...\n')
    
    for (const file of eventFiles) {
	    const event = require(`../events/${file}`)
    
        console.log(`\t ${event.name} event has been loaded!`)
	
        if (event.once) {
		    client.once(event.name, (...args) => {
                event.run(...args, client)
                console.log(event.name + ' has been run!')
            })
	    } else {
		    client.on(event.name, async (...args) => {
                event.run(...args, client)
                console.log(event.name + ' has been run!')

                let getEventLog = logger[event.name] // gets logged embed by event name as key

                if (!getEventLog) return

                let [logEmbed, guildId] = getEventLog(...args) // the logs embed

                const modLogs = await getModLogs(guildId)

                if (!modLogs) return

                const guild = client.guilds.cache.get(guildId) || await client.guilds.fetch(guildId)

                const mlChannel = guild.channels.cache.get(modLogs)

                mlChannel?.send({ embeds: [logEmbed] })
            })
	    }
    }
}
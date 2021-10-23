const fs = require('fs')
const logger = require('../utils/logger-utils.js')

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
		    client.on(event.name, (...args) => {
                event.run(...args, client)
                console.log(event.name + ' has been run!')

                let getEventLog = logger[event.name] // gets logged embed by event name as key

                if (!getEventLog) return

                let logs = getEventLog(...args) // the logs embed

                // the log channel.send({ embeds: [logs] })
            })
	    }
    }
}
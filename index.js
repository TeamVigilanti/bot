const { Client, Intents, Collection } = require('discord.js')
const { FLAGS } = Intents
const fs = require('fs')
const mongoose = require('mongoose')
const config = require('./config.json')
const express = require('express');
const app = express();
const port = 3000;


const client = new Client({
    intents: [
        FLAGS.DIRECT_MESSAGES,
        FLAGS.GUILDS,
        FLAGS.GUILD_MESSAGES,
        FLAGS.GUILD_MEMBERS,
        FLAGS.GUILD_PRESENCES,
        FLAGS.GUILD_VOICE_STATES
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'],
    presence: {
        activities: [{
            name: 'Automoderation, without the catch. | cc!help',
            type: 'PLAYING'
        }]
    }
})

client.commands = new Collection()

client.slashCommands = new Collection()

client.categories = fs.readdirSync('./commands')

require('./handlers/command')(client)

require('./handlers/slashCommand')(client, false)

require('./handlers/event')(client)

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB!')
}).catch(e => {
    console.log(`Could not connect to MongoDB!\nError: ${e}`)
})

app.get('/', (req, res) => res.send('Status 200!'));
app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));

enabled = config?.devmode
if (enabled == true) {
    try {
        client.login(config.devToken)
    } catch (e) {
        return console.log(`Could not login with \`devToken\`!\nError: ${e}`)
    }
} else {
    try {
        client.login(config.prodToken)
    } catch (e) {
        return console.log(`Could not login with \`prodToken\`!\nError: ${e}`)
    }
};
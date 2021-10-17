const config = require('../config.json');

module.exports = {
    name: 'ready',
    run (client) {
        enabled = config.devmode
        console.log(`${enabled ? 'Hi there.\nWelcome to the CrowdControl developer portal!\nRest assured, this version of CrowdControl is running on CrowdControl Dev.\nAs a security precaution, the program will now hang for 10 seconds in case you need to change the devmode setting.' : '!*!*!*!*!*!\nDev mode is NOT enabled! The bot is running on production level! Please kill the process if work in progress code is contained in this build!\n!*!*!*!*!*!\n\nAs a security precaution, the program will now hang for 10 seconds in case you need to change the devmode setting.'}`)
        setTimeout(() => { 
            console.log(`\n\n${client.user.username} is online and active! Live in ${client.guilds.cache.size} guilds!\n`)
        }, 10000);
    }
}
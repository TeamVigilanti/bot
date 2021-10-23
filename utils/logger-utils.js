// eventName: (eventArgs) => { event logged embed }

const logger = {
    messageDelete: (message) => {
        const embed = new MessageEmbed().setTitle('message is delet. fard.')

        return embed
    }
}

module.exports = logger
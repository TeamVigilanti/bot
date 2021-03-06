import { MessageEmbed, MessageEmbedOptions } from 'discord.js'

/** @description - A Custom Embed Class For Vigilanti */
export default class VGLEmbed extends MessageEmbed {
    public emojis = { success: '', err: '' } // dont forget to add your emojis here btw 

    public colours = { success: 0x0000FF, err: 0xFF0000 }

    // i did a dumb dumb and forgot to make options optional lmao
    constructor(options?: MessageEmbedOptions) {
        super(options)
    }

    // Basically sets the type of the embed
    public setProps(type: 'err' | 'success', title: string, description?: string) {
        this.title = this.emojis[type] + ' | ' + title
        this.color = this.colours[type]

        return this
    }

    // if description is a array then it joins it by a line break
    public setDescription(description: string | string[]): this {
        if (Array.isArray(description)) description = description.join('\n')

        return super.setDescription(description)
    }

    // capitalizes every word of the field heading unless told not to
    public addField(name: string, value: string, inline?: boolean, capital: boolean = true): this {
        if (capital) {
            let headingWords = name.split(' ')

            name = headingWords.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        }

        return super.addField(name, value, inline)
    }
}
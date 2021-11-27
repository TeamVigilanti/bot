import VigilantiClient from "./VigilantiClient";

import { readdirSync } from "fs";

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import CommandOptionType from '../Types/Interfaces/Enums/CommandOptionType'
import { ApplicationCommandOptionData } from 'discord.js'

export default class VigilantiHandlers {
    public client:VigilantiClient;
    public dirs: { events:string, commands:string };

    public constructor(client:VigilantiClient, dirs: { events:string, commands:string }){
        this.client = client;
        this.dirs = dirs;
    }

    public async eventsLoader(dir:string = this.dirs.events){
        const categories = readdirSync(dir);

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const events = readdirSync(`${dir}/${category}`).filter((f) => f.endsWith(".js"));

            for (let i = 0; i < events.length; i++) {
                const event = new (await import(`${dir}/${category}/${events[i]}`)).default();
                event.client = this.client;
                this.client[event.type as "on" | "once"](event.name, (...args) => {
                    event.run(...args);
                });
            }
        }
    }

    public async commandsLoader(dir:string = this.dirs.commands){
        let vglServer = await this.client.guilds.fetch('894243022085177445');

        const commandCategories = readdirSync(dir);

        for (let i = 0; i < commandCategories.length; i++){
            const category = commandCategories[i];
            const commands = readdirSync(`${dir}/${category}`).filter((file) => file.endsWith(".js"));

            for (let i = 0; i < commands.length; i++) {
                const cmd = new (await import(`${dir}/${category}/${commands[i]}`)).default();
                this.client.commands.set(cmd.name, cmd);
                console.log(`Loaded command: ${cmd.name}`);
                cmd.client = this.client;
                cmd.utils = this.client.utils;
            }
        }

        const commands = (this.client.commands.map(({run, ...data}) => data)).map(cmd => {
            if (!cmd.options) return cmd

            for (let i = 0; i < cmd.options.length; i++){
                if (typeof cmd.options[i] === 'number') continue

                cmd.options[i] = CommandOptionType[cmd.options[i] as any] as unknown as ApplicationCommandOptionData
            }
            return cmd
        })

        const rest = new REST({ version: '9' }).setToken(this.client!.token as string);

        try {
            await rest.put(Routes.applicationGuildCommands(this.client.user?.id as string, vglServer.id), { body: commands });
        } catch (e) {
            console.error(e);
        }
    }
}
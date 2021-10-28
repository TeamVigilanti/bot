import { Client, ClientOptions, Collection } from "discord.js";
import { join } from "path";
import Command from "../Types/Command";

import CrowdControlHandlers from "./CrowdControlHandlers";

export default class CrowdControlClient extends Client {
    public owners:string[] = ["349564775447003137", "", "804970459561066537"];
    public commands:Collection<string, Command> = new Collection();

    public handlers:CrowdControlHandlers = new CrowdControlHandlers(this, {
        events: join(__dirname, "..", "Events"),
        commands: join(__dirname, "..", "Commands")
    });

    public constructor(options:ClientOptions){
        super(options);
    }

    public async start(){
        await this.handlers.eventsLoader();
        return this.login(process.env.devmode ? process.env.devToken : process.env.prodToken);
    }
}
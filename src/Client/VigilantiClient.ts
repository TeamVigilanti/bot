import { Client, ClientOptions, Collection } from "discord.js";
import { join } from "path";
import { PrismaClient } from "@prisma/client";

import Command from "../Types/Command";
import VigilantiHandlers from "./VigilantiHandlers";
import VigilantiUtils from "./VigilantiUtils";

export default class VigilantiClient extends Client {
    public owners:string[] = ["349564775447003137", "668423998777982997", "804970459561066537"];
    public commands:Collection<string, Command> = new Collection();
    public db:PrismaClient = new PrismaClient();
    public utils:VigilantiUtils = new VigilantiUtils(this);

    public handlers:VigilantiHandlers = new VigilantiHandlers(this, {
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
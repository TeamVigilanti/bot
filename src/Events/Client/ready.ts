import Event from "../../Types/Event";

export default class ReadyEvent extends Event {
    public constructor(){
        super("ready", "once");
    }

    async run(){
        await this.client?.handlers.commandsLoader();
        console.log(this.client?.user?.tag + " online.");
    }
}
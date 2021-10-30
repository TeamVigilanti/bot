import Event from "../../Types/Event";

export default class ReadyEvent extends Event {
    public constructor(){
        super("ready", "once");
    }

    async run(){
        await this.client?.handlers.commandsLoader();
        console.log(this.client?.user?.tag + " online.");

        this.client?.user?.setActivity("with the help of the help command.");


        this.client?.guilds.cache.forEach((guild) => {
            this.client?.db.guild.upsert({
                where: { guildID: guild.id },
                create: {
                    guildID: guild.id, 
                    premium: true, // EA Moment :kek:  :kek:
                    settings: {} // <- i c just setting the settings to empty object smile
                },
                update: {
                    // say theres already a guild model, update it if u want  
                }
            });
        });

        


    }
}
import VigilantiClient from "../Client/VigilantiClient";

export default class Event {
    public name:string;
    public client?:VigilantiClient;
    public type: "on" | "once";

    public constructor(name:string, type: "on" | "once" = "on"){
        this.name = name;
        this.type = type;
    }
}
import CrowdControlClient from "../Client/CrowdControlClient";

export default class Event {
    public name:string;
    public client?:CrowdControlClient;
    public type: "on" | "once";

    public constructor(name:string, type: "on" | "once" = "on"){
        this.name = name;
        this.type = type;
    }
}
import CrowdControlClient from "./Client/CrowdControlClient";
import { config } from "dotenv";
config();

const client:CrowdControlClient = new CrowdControlClient({intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"], partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]});
client.start();
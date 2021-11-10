import VigilantiClient from "./Client/VigilantiClient";
import { config } from "dotenv";
config();

const client:VigilantiClient = new VigilantiClient({intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"], partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]});
client.start();
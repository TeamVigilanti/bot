import { ApplicationCommandOptionType, CommandInteraction  } from "discord.js";
import CrowdControlClient from "../Client/CrowdControlClient";

export default class Command {
    public client?: CrowdControlClient;
    public readonly name: string;
    public readonly description: string;
    public readonly category: string;
    public readonly devOnly?: boolean;
    public readonly options?: {
      type: ApplicationCommandOptionType | number;
      name: string;
      description: string;
      required?: boolean;
      choices?: {
        name: string;
        value: string;
      }[];
      options?: {
        type: ApplicationCommandOptionType | number;
        name: string;
        description: string;
        required?: boolean;
        choices?: {
          name: string;
          value: string;
        }[];
      }[];
    }[];
  
    public constructor(settings?: CommandOptions) {
      this.name = settings!.name;
      this.description = settings!.description;
      this.category = settings!.category;
      this.devOnly = settings!.devOnly;
      this.options = settings!.options;
    }
  
    run(int: CommandInteraction): any {}
}

interface CommandOptions {
    name: string;
    description: string;
    category: string;
    devOnly: boolean;
    // maybe smth like ownerOnly: boolean; || or modOnly: boolean;
    options?: {
      type: ApplicationCommandOptionType | number;
      name: string;
      description: string;
      required?: boolean;
      choices?: {
        name: string;
        value: string;
      }[];
      options?: {
        type: ApplicationCommandOptionType | number;
        name: string;
        description: string;
        required?: boolean;
        choices?: {
          name: string;
          value: string;
        }[];
        options?: {
          type: ApplicationCommandOptionType | number;
          name: string;
          description: string;
          required?: boolean;
          choices?: {
            name: string;
            value: string;
          }[];
        }[];
      }[];
    }[];
  }
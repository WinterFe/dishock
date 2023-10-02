import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, AutocompleteInteraction, ChatInputCommandInteraction } from 'discord.js';
import { Express } from 'express';
import { type Logger } from 'winston';
import { Database } from './Database/Server';

export interface SlashCommand {
    command: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => void;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
    cooldown?: number; // (s)
}

// export interface Command {
//     name: string;
//     execute: (message: Message, args: Array<string>) => void;
//     permissions: Array<PermissionResolvable>;
//     aliases: Array<string>;
//     cooldown?: number;
// }

interface GuildOptions {
    prefix: string;
}
export type GuildOption = keyof GuildOptions;
export interface BotEvent {
    name: string;
    isOnce?: boolean | false;
    execute: (...args) => void;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT_ID: string;
            TOKEN: string;
        }
    }
}

declare module 'discord.js' {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>;
        cooldowns: Collection<string, number>;
        logger: Logger;
        db: Database;
    }
}

import { config } from 'dotenv';
import { Client, GatewayIntentBits, Collection, PermissionFlagsBits } from 'discord.js';
import { SlashCommand } from './types';
import { join } from 'path';
import { readdirSync } from 'fs';
import Logger from './utils/logger';
config({ path: join(__dirname, '../.env') });

const client = new Client({ intents: ['Guilds', 'GuildMembers', 'DirectMessages', 'DirectMessageReactions', 'GuildMessageReactions'] });

client.slashCommands = new Collection<string, SlashCommand>();
client.cooldowns = new Collection<string, number>();
client.logger = Logger;

const handlersDir = join(__dirname, './handlers');
readdirSync(handlersDir).forEach((handler) => {
    if (!handler.endsWith('.js')) return;
    require(`${handlersDir}/${handler}`)(client);
});

client.login(process.env.TOKEN);

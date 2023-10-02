import { Client } from 'discord.js';
import { join } from 'path';
import { readdirSync } from 'fs';
import { BotEvent } from '../types';

module.exports = (client: Client) => {
    const eventsDir = join(__dirname, '../events');

    readdirSync(eventsDir).forEach((file) => {
        if (!file.endsWith('.js')) return;
        const event: BotEvent = require(`${eventsDir}/${file}`).default;
        event.isOnce ? client.once(event.name, (...args) => event.execute(...args)) : client.on(event.name, (...args) => event.execute(...args));
    });
};

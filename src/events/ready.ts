import { Client } from 'discord.js';
import { BotEvent } from '../types';

const event: BotEvent = {
    name: 'ready',
    isOnce: true,
    execute: (client: Client) => {
        client.logger.info(`${client.user?.tag} logged in!`);
    },
};

export default event;

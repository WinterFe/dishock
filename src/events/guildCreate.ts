import { Guild } from 'discord.js';
import { BotEvent } from '../types';
import ServerDb from '../Database/Server';
import Logger from '../utils/logger';

const event: BotEvent = {
    name: 'guildCreate',
    execute: (guild: Guild) => {
        Logger.debug(`New server joined! Adding ${guild.name} to the DB...`);
        ServerDb.get(guild.id);
    },
};

export default event;

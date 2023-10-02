import { Client, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { SlashCommand } from '../types';

module.exports = (client: Client) => {
    const commands: SlashCommandBuilder[] = [];
    let commandsDir = join(__dirname, '../commands');

    readdirSync(commandsDir).forEach((file) => {
        if (!file.endsWith('.js')) return;
        let command: SlashCommand = require(`${commandsDir}/${file}`).default;
        commands.push(command.command);
        client.slashCommands.set(command.command.name, command);
    });

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: commands.map((command) => command.toJSON()),
    })
        .then((data: any) => {
            client.logger.debug(`Loaded ${data.length} commands!`);
        })
        .catch((e) => {
            client.logger.error(e);
        });
};

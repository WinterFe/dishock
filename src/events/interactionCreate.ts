import { Interaction } from 'discord.js';
import { BotEvent } from '../types';

const event: BotEvent = {
    name: 'interactionCreate',
    execute: (interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            let command = interaction.client.slashCommands.get(interaction.commandName);
            let cooldown = interaction.client.cooldowns.get(`${interaction.commandName}.${interaction.user.username}`);
            if (!command) return;

            if (command.cooldown && cooldown) {
                if (Date.now() < cooldown) {
                    interaction.reply(`Command is on cooldown!\nPlease wait ${Math.floor(Math.abs(Date.now() - cooldown) / 1000)} second(s)...`);
                    setTimeout(() => interaction.deleteReply(), 5000); // set to delete after cooldown
                    return;
                }

                interaction.client.cooldowns.set(`${interaction.commandName}.${interaction.user.username}`, Date.now() + command.cooldown * 1000);
                setTimeout(() => {
                    interaction.client.cooldowns.delete(`${interaction.commandName}.${interaction.user.username}`);
                }, command.cooldown * 1000);
            } else if (command.cooldown && !cooldown) {
                interaction.client.cooldowns.set(`${interaction.commandName}.${interaction.user.username}`, Date.now() + command.cooldown * 1000);
            }
            command.execute(interaction);
        } else if (interaction.isAutocomplete()) {
            const command = interaction.client.slashCommands.get(interaction.commandName);
            if (!command) {
                interaction.client.logger.error(`No command matching ${interaction.commandName} found!`);
                return;
            }

            try {
                if (!command.autocomplete) return;
                command.autocomplete(interaction);
            } catch (err) {
                interaction.client.logger.error(err);
            }
        }
    },
};

export default event;

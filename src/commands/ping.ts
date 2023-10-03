import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';
import { EmbedBuilder } from '@discordjs/builders';

const command: SlashCommand = {
    command: new SlashCommandBuilder().setName('ping').setDescription('Ping pong! Anyone home!?'),
    execute: (interaction) => {
        let authorAvatar: string | undefined = interaction.user.avatarURL()!;
        interaction.reply({
            embeds: [new EmbedBuilder().setAuthor({ name: interaction.user.username, iconURL: authorAvatar }).setDescription(`🏓 Pong!\n\n>>> Response Time: ${interaction.client.ws.ping}ms`)],
        });
    },
    cooldown: 10,
};

export default command;

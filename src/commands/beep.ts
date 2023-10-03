import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';
import { EmbedBuilder } from '@discordjs/builders';
import PiShock from '../utils/pishock';
import UserDb from '../Database/User';

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('beep')
        .addIntegerOption((option) => {
            return option.setName('duration').setDescription('The duration of the operation!').setRequired(true);
        })
        .setDescription('Beep beep! Send a shock to your PiShock!'),
    execute: async (interaction) => {
        await interaction.deferReply();
        const options: { [key: string]: string | number | boolean } = {};
        for (let i = 0; i < interaction.options.data.length; i++) {
            const element = interaction.options.data[i];
            if (element.name && element.value) options[element.name] = element.value;
        }

        const embed = new EmbedBuilder().setTitle(`� Beep beep!`).setDescription(`Beeping ${interaction.user.username}'s PiShock for **${options.duration}s**!`).setTimestamp();
        let user = await UserDb.get(interaction.user.id);

        await PiShock.req(interaction.user.username, user.apikey, user.sharecode, 2, 100, Number(options.duration));
        return interaction.editReply({ embeds: [embed] });
    },
    cooldown: 10,
};

export default command;

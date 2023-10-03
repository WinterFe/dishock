import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';
import { EmbedBuilder } from '@discordjs/builders';
import PiShock from '../utils/pishock';
import UserDb from '../Database/User';

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('buzz')
        .addIntegerOption((option) => {
            return option.setName('intensity').setDescription('The intensity of the operation!').setRequired(true);
        })
        .addIntegerOption((option) => {
            return option.setName('duration').setDescription('The duration of the operation!').setRequired(true);
        })
        .setDescription('Buzz buzz.. Send a vibration to your PiShock!'),
    execute: async (interaction) => {
        await interaction.deferReply();
        const options: { [key: string]: string | number | boolean } = {};
        for (let i = 0; i < interaction.options.data.length; i++) {
            const element = interaction.options.data[i];
            if (element.name && element.value) options[element.name] = element.value;
        }

        const embed = new EmbedBuilder().setTitle(`📳 Buzz Buzz..!`).setDescription(`Vibrating ${interaction.user.username}'s PiShock for **${options.intensity}%** for a total of **${options.duration}s**!`).setTimestamp();
        let user = await UserDb.get(interaction.user.id);

        await PiShock.req(interaction.user.username, user.apikey, user.sharecode, 1, Number(options.intensity), Number(options.duration));
        return interaction.editReply({ embeds: [embed] });
    },
    cooldown: 10,
};

export default command;

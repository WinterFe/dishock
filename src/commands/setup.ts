import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';
import { EmbedBuilder } from '@discordjs/builders';
import UserDb from '../Database/User';

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('setup')
        .addStringOption((option) => {
            return option.setName('api_key').setDescription('Your PiShock API key! Found/generated here: https://pishock.com/#/account').setRequired(true);
        })
        .addStringOption((option) => {
            return option.setName('share_code').setDescription('Your user-generated share code for your PiShock collar.').setRequired(true);
        })
        .setDescription('Set up your user profile, and get started with DiShock!'),
    execute: async (interaction) => {
        try {
            await interaction.deferReply({ ephemeral: true });
            const options: { [key: string]: string | number | boolean } = {};
            if (!interaction.options) return interaction.editReply({ content: 'Uh oh! An unexpected error occurred...' });
            for (let i = 0; i < interaction.options.data.length; i++) {
                const element = interaction.options.data[i];
                if (element.name && element.value) options[element.name] = element.value;
            }

            const embed = new EmbedBuilder()
                .setTitle(`PiShock Configuration`)
                .setDescription(`This is your provided configuration for your PiShock collar.\n**Do not share the keys/codes below, they provide access to your collar!**`)
                .addFields(
                    {
                        name: 'Api Key',
                        value: options.api_key.toString(),
                        inline: true,
                    },
                    { name: 'Share Code', value: options.share_code.toString(), inline: true }
                )
                .setTimestamp();

            UserDb.update(interaction.user.id, { apikey: options.api_key.toString(), sharecode: options.share_code.toString() });
            return interaction.editReply({ embeds: [embed] });
        } catch (err) {
            interaction.editReply({ content: 'An error occurred! Join the support server for more help...' });
        }
    },
    cooldown: 10,
};

export default command;

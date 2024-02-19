import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';
import { EmbedBuilder } from '@discordjs/builders';
import UserDb from '../Database/User';

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('setup')
        .addStringOption((option) => {
            return option.setName('api_key').setDescription('Your PiShock API key! Found/generated here: https://pishock.com/#/account').setRequired(false);
        })
        .addStringOption((option) => {
            return option.setName('share_code').setDescription('Your user-generated share code for your PiShock collar.').setRequired(false);
        })
        .addStringOption((option) => {
            return option.setName('bio').setDescription('Set your profile bio!').setRequired(false);
        })
        .setDescription('Set up your user profile, and get started with DiShock!'),
    execute: async (interaction) => {
        let apiKey: string | null, shareCode: string | null, bio: string | null;

        function truncateString(input: string | any, visibleLength: number = 3): string {
            if (input.length <= visibleLength) return input;
            const prefix = input.slice(0, visibleLength);
            const suffix = input.slice(-4);
            return `${prefix}...${suffix}`;
        }

        try {
            await interaction.deferReply({ ephemeral: true });
            const options: { [key: string]: string | number | boolean } = {};
            if (!interaction.options) return interaction.editReply({ content: 'Uh oh! An unexpected error occurred...' });
            for (let i = 0; i < interaction.options.data.length; i++) {
                const element = interaction.options.data[i];
                if (element.name && element.value) options[element.name] = element.value;
            }

            const user = UserDb.get(interaction.user.id);

            // Use optional chaining to safely access properties
            apiKey = (await user)?.apikey;
            shareCode = (await user)?.sharecode;
            bio = (await user)?.bio;

            const embed = new EmbedBuilder()
                .setTitle(`PiShock Configuration`)
                .setDescription(`This is your provided configuration for your PiShock collar.\n**Be careful sharing these!**`)
                .addFields({
                    name: "Secrets 'n Treasures",
                    value: `\`API Key\` ||${truncateString(apiKey ?? 'Not provided')}||\n\`Share Code\` ||${truncateString(shareCode ?? 'Not provided')}||`,
                    inline: true,
                })
                .setTimestamp();

            UserDb.update(interaction.user.id, { apikey: options.api_key?.toString(), sharecode: options.share_code?.toString(), bio: options.bio?.toString() });
            return interaction.editReply({ embeds: [embed] });
        } catch (err) {
            console.error(err);
            interaction.editReply({ content: 'An error occurred! Join the support server for more help...' });
        }
    },
    cooldown: 10,
};

export default command;

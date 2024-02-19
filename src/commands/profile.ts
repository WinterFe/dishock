import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';
import { EmbedBuilder } from '@discordjs/builders';
import UserDb from '../Database/User';

const command: SlashCommand = {
    command: new SlashCommandBuilder().setName('profile').setDescription('Your DiShock profile!'),
    execute: async (interaction) => {
        await interaction.deferReply({ ephemeral: true });
        let user = await UserDb.get(interaction.user.id);

        function truncateString(input: string | any, visibleLength: number = 3): string {
            if (input.length <= visibleLength) return input;
            const prefix = input.slice(0, visibleLength);
            const suffix = input.slice(-4);
            return `${prefix}...${suffix}`;
        }

        const embed = new EmbedBuilder().setTitle(`<:user:1177453012675985468> DiShock Profile`).setDescription(`> *${user.bio}*`).setTimestamp();
        embed.addFields([
            { name: 'Registered', value: `${user.registered}` },
            { name: "Keys 'n Codes", value: `\`API Key\` ||${truncateString(user.apikey, 5)}||\n\`Share Code\` ||${truncateString(user.sharecode, 5)}||\n*Do not share keys or codes with anyone!*` },
        ]);
        embed.setThumbnail(interaction.user.displayAvatarURL());

        return interaction.editReply({ embeds: [embed] });
    },
    cooldown: 10,
};

export default command;

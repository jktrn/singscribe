import { Embed, SlashCommandBuilder } from 'discord.js'
import { QueryType } from 'discord-player'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song or playlist from YouTube.')
    .addSubcommand((subcommand) =>
        subcommand
            .setName('song')
            .setDescription('Play a song from YouTube.')
            .addStringOption((option) =>
                option
                    .setName('url')
                    .setDescription('Provide a song name or URL to play.')
                    .setRequired(true)
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName('playlist')
            .setDescription('Play a playlist from YouTube.')
            .addStringOption((option) =>
                option
                    .setName('url')
                    .setDescription('Provide a playlist name or URL to play.')
                    .setRequired(true)
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName('search')
            .setDescription('Search for a song from YouTube.')
            .addStringOption((option) =>
                option
                    .setName('query')
                    .setDescription('Provide a query to search for.')
                    .setRequired(true)
            )
    )

// export default command(meta, async ({ interaction }) => {
//     const member = await interaction.guild?.members.fetch(interaction.user.id)
//     if(!member?.voice.channel) return interaction.reply({
//         ephemeral: true,
//         content: 'You are not in a voice channel!'}
//     )
// })
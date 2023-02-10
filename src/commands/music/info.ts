/**
 * Displays info about the currently playing song.
 * @usage /info
 */

import { SlashCommandBuilder } from 'discord.js'
import { command, Reply } from '../../utils'

const meta = new SlashCommandBuilder().setName('info').setDescription('Displays info about the currently playing song.')

export default command(meta, async ({ client, interaction }) => {
    // Check if the command was used in a server
    if (!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))

    // Checks if queue exists, or if there is no current track
    const queue = client.player.nodes.get(interaction.guild.id)
    if (!queue || !queue.currentTrack) return interaction.reply(Reply.error('There is nothing playing.'))

    const currentTrack = queue.currentTrack

    // Creates a progress bar
    const bar = queue.node.createProgressBar({
        queue: false,
        length: 19,
    })

    await interaction.reply(
        Reply.info(
            `Currently Playing: [**${currentTrack.title}**](${currentTrack.url})\n\n` + bar,
            currentTrack.thumbnail,
            { text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL()! }
        )
    )
})

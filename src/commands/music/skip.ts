/**
 * Skips the current song.
 * @usage /skip
 */

import { SlashCommandBuilder } from 'discord.js'
import { command, Reply } from '../../utils'

const meta = new SlashCommandBuilder().setName('skip').setDescription('Skips the current song.')

export default command(meta, async ({ client, interaction }) => {
    // Check if the command was used in a server
    if (!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))

    // Checks if queue exists
    const queue = client.player.nodes.get(interaction.guild.id)
    if (!queue) return interaction.reply(Reply.error('There is nothing playing.'))

    // Finds next track in queue for embed
    const nextTrack = queue.tracks.at(1)
    const nextTrackString = nextTrack ? `[${nextTrack.title}](${nextTrack.url})` : 'nothing'

    queue.node.skip()
    await interaction.reply(
        Reply.info(
            `[${queue.currentTrack!.title}](${
                queue.currentTrack!.url
            }) has been skipped!\n**Now Playing**: ${nextTrackString}`,
            nextTrack?.thumbnail
        )
    )
})

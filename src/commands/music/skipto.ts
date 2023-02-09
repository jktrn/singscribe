/**
 * Skips to a specific track number in the queue.
 * @usage /skipto <tracknumber>
 * @param {number} tracknumber - The track number to skip to.
 */

import { SlashCommandBuilder } from 'discord.js'
import { command, Reply } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('skipto')
    .setDescription('Skips to a specific track number in the queue.')
    .addNumberOption((option) =>
        option
            .setName('tracknumber')
            .setDescription('The track number to skip to.')
            .setRequired(true)
            .setMinValue(1)
    )

export default command(meta, async ({ client, interaction }) => {
    // Check if the command was used in a server
    if(!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))

    // Checks if queue exists
    const queue = client.player.nodes.get(interaction.guild.id)
    if(!queue) return interaction.reply(Reply.error('There is nothing playing.'))
    
    // Checks if the user is in a voice channel
    const currentSong = queue.currentTrack
    if(!currentSong) return interaction.reply(Reply.error('There is nothing playing.'))

    // Checks to see if the provided track number is valid
    const trackNumber = interaction.options.getNumber('tracknumber', true)
    const nextTrack = queue.tracks.at(trackNumber)
    if(!nextTrack) return interaction.reply(Reply.error(`The track number specified must be less than ${queue.tracks.size}.`))

    queue.node.skipTo(trackNumber - 1)

    await interaction.reply(Reply.info(
        `[${currentSong.title}](${currentSong.url}) has been skipped!\n**Now Playing**: [${nextTrack.title}](${nextTrack.url})`,
        nextTrack.thumbnail,
    ))
})
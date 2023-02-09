/**
 * Displays the current song queue, alongside the progress of the currently playing song.
 * @usage /queue <page>
 * @param {number} page - The page number to display (if paginated).
 */

import { SlashCommandBuilder } from 'discord.js'
import { command, Reply } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Displays the current song queue.')
    .addNumberOption((option) =>
        option
            .setName('page')
            .setDescription('The page number to display.')
            .setRequired(false)
            .setMinValue(1)
    )

export default command(meta, async ({ client, interaction }) => {
    // Check if the command was used in a server
    if(!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))

    // Checks if queue exists, or if there is no current track
    const queue = await client.player.nodes.get(interaction.guild.id)
    if(!queue) return interaction.reply(Reply.error('There are no songs in the queue!'))

    // Turns tracks into an array because maintainers are dumbasses
    const tracks = queue.tracks.toArray()
    if (!tracks[0]) return interaction.reply(Reply.error('There are no songs in the queue. Use `/info` to view the currently playing song.'))

    // Paginates the queue into 10 tracks per page
    const totalPages = Math.ceil(tracks.length / 10) || 1

    // Checks if the page number is valid
    const page = (interaction.options.getNumber('page') || 1) - 1
    if(page > totalPages) return interaction.reply(Reply.error(`There are only ${totalPages} pages in the queue.`))

    // Creates a string of the tracks on the page
    const tracksString = tracks.slice(page * 10, page * 10 + 11).map((song, i) => {
        return `**${(page * 10 + (i + 1)).toString().padStart(2, '0')}**. [${song.title}](${song.url}) (<@${song.requestedBy!.id}>, \`${song.duration}\`)`
    }).join('\n')

    // Creates a progress bar
    const progress = queue.node.createProgressBar()

    await interaction.reply(Reply.info(
        `**Current Track:** [${queue.currentTrack!.title}](${queue.currentTrack?.url}) \n${progress}\n\n**Next Up** (Total: ${tracks.length})\n${tracksString}`,
        queue.currentTrack!.thumbnail,
        { text: `Page ${page + 1} of ${totalPages}`, iconURL: interaction.member?.avatar! }
    ))
})
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
    if(!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))

    const queue = await client.player.nodes.get(interaction.guild.id)
    if(!queue) return interaction.reply(Reply.error('There are no songs in the queue!'))

    const tracks = queue.tracks.toArray()
    if (!tracks[0]) return interaction.reply(Reply.error('There are no songs in the queue. Use `/info` to view the currently playing song.'))

    const totalPages = Math.ceil(tracks.length / 10) || 1
    const page = (interaction.options.getNumber('page') || 1) - 1
    if(page > totalPages) return interaction.reply(Reply.error(`There are only ${totalPages} pages in the queue.`))

    const tracksString = tracks.slice(page * 10, page * 10 + 11).map((song, i) => {
        return `**${(page * 10 + (i + 1)).toString().padStart(2, '0')}**. [${song.title}](${song.url}) (<@${song.requestedBy!.id}>, \`${song.duration}\`)`
    }).join('\n')

    const progress = queue.node.createProgressBar()

    await interaction.reply(Reply.info(
        `**Current Track:** [${queue.currentTrack!.title}](${queue.currentTrack?.url}) \n${progress}\n\n**Next Up** (Total: ${tracks.length - 1})\n${tracksString}`,
        queue.currentTrack!.thumbnail,
        { text: `Page ${page + 1} of ${totalPages}`, iconURL: interaction.member?.avatar! }
    ))
})
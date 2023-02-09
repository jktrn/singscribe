import { SlashCommandBuilder } from 'discord.js'
import { command, Reply } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song.')

export default command(meta, async ({ client, interaction }) => {
    if(!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))

    const queue = client.player.nodes.get(interaction.guild.id)
    if(!queue) return interaction.reply(Reply.error('There is nothing playing.'))

    const nextTrack = queue.tracks.at(1)
    if(!nextTrack) return interaction.reply(Reply.error('There is nothing to skip to.'))
    
    queue.node.skip()
    await interaction.reply(Reply.info(
        `[${queue.currentTrack!.title}](${queue.currentTrack!.url}) has been skipped!\n**Now Playing**: [${nextTrack.title}](${nextTrack.url})`,
        nextTrack.thumbnail,
    ))
})
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song.')

export default command(meta, async ({ client, interaction }) => {
    const embed = new EmbedBuilder()

    if(!interaction.guild) {
        embed.setDescription('You can only use this command in a server.')
        return interaction.reply({ embeds: [embed] })
    }

    const queue = client.player.nodes.get(interaction.guild.id)
    if(!queue) {
        embed.setDescription('There are no songs in the queue!')
        return interaction.reply({ embeds: [embed] })
    }

    const nextTrack = queue.tracks.at(1)
    if(!nextTrack) {
        embed.setDescription('There are no songs in the queue!')
        return interaction.reply({ embeds: [embed] })
    }
    
    queue.node.skip()
    
    embed.setDescription(`[${queue.currentTrack!.title}](${queue.currentTrack!.url}) has been skipped!\n**Now Playing**: [${nextTrack.title}](${nextTrack.url})`)
    embed.setThumbnail(nextTrack.thumbnail)

    await interaction.reply({
        embeds: [embed]
    })
})
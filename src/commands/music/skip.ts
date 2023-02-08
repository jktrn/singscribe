import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song.')

export default command(meta, async ({ client, interaction }) => {
    const embed = new EmbedBuilder()

    if(!interaction.inGuild()) {
        embed.setDescription('You can only use this command in a server.')
        return interaction.reply({ embeds: [embed] })
    }

    const queue = client.player.getQueue(interaction.guildId)
    if(!queue) {
        embed.setDescription('There are no songs in the queue!')
        return interaction.reply({ embeds: [embed] })
    }

    queue.skip()
    
    embed.setDescription(`[${queue.current.title}](${queue.current.url}) has been skipped!\n**Now Playing**: [${queue.tracks[1].title}](${queue.tracks[1].url})`)
    embed.setThumbnail(queue.tracks[1].thumbnail)

    await interaction.reply({
        embeds: [embed]
    })
})
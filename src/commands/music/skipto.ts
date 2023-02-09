import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('skipto')
    .setDescription('Skip to a specific track number in the queue.')
    .addNumberOption((option) =>
        option
            .setName('tracknumber')
            .setDescription('The track number to skip to.')
            .setRequired(true)
            .setMinValue(1)
    )

export default command(meta, async ({ client, interaction }) => {
    const embed = new EmbedBuilder()
    if(!interaction.guild) {
        embed.setDescription('This command can only be used in a server.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    const queue = client.player.nodes.get(interaction.guild.id)
    if(!queue) {
        embed.setDescription('There is no music playing.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    const currentSong = queue.currentTrack!
    const trackNumber = interaction.options.getNumber('tracknumber', true)
    if(trackNumber > queue.tracks.size) {
        embed.setDescription(`The track number must be less than ${queue.tracks.size}.`)
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    queue.node.skipTo(trackNumber - 1)
    embed.setDescription(`${currentSong.title} has been skipped! Moving to track number ${trackNumber}.`)

    await interaction.reply({
        embeds: [embed]
    })
})
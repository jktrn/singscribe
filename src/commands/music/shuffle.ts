import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffle the current queue.')

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

    queue.tracks.shuffle()
    embed.setDescription(`The queue of ${queue.tracks.size - 1} songs has been shuffled!`)
    await interaction.reply({ embeds: [embed] })
})
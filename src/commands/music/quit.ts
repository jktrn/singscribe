import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('quit')
    .setDescription('Leave the current voice channel and clear the queue.')

export default command(meta, async ({ client, interaction }) => {
    const embed = new EmbedBuilder()
    if(!interaction.inGuild()) {
        embed.setDescription('This command can only be used in a server.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    const queue = client.player.getQueue(interaction.guildId)
    if(!queue) {
        embed.setDescription('There is no music playing.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    queue.destroy()
    embed.setDescription('Left the voice channel and cleared the queue. Goodbye!')
    await interaction.reply({
        embeds: [embed]
    })
})
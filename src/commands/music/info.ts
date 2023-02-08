import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('info')
    .setDescription('Displays info about the currently playing song.')

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

    let bar = queue.createProgressBar({
        queue: false,
        length: 19,
    })

    const song = queue.current

    embed
        .setThumbnail(song.thumbnail)
        .setDescription(`**Currently Playing** [${song.title}](${song.url})\n\n` + bar)

    await interaction.reply({
        embeds: [embed]
    })
})
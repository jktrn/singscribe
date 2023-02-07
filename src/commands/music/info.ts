import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('info')
    .setDescription('Displays info about the currently playing song.')

export default command(meta, async ({ client, interaction }) => {
    if(!interaction.inGuild()) return interaction.reply({
        ephemeral: true,
        content: 'You can only use this command in a server.',
    })

    const queue = client.player.getQueue(interaction.guildId)
    if(!queue) return await interaction.reply({
        ephemeral: true,
        content: 'There are no songs in the queue!',
    })

    let bar = queue.createProgressBar({
        queue: false,
        length: 19,
    })

    const song = queue.current

    await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setThumbnail(song.thumbnail)
                .setDescription(`**Currently Playing** [${song.title}](${song.url})\n\n` + bar)
        ]
    })
})
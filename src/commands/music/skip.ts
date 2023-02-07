import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song.')

export default command(meta, async ({ client, interaction }) => {
    if(!interaction.inGuild()) return interaction.reply({
        ephemeral: true,
        content: 'You can only use this command in a server.',
    })

    const queue = client.player.getQueue(interaction.guildId)
    if(!queue) return await interaction.reply({
        ephemeral: true,
        content: 'There is no music playing.',
    })

    const currentSong = queue.current

    queue.skip()
    await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setDescription(`${currentSong.title} has been skipped!`)
                .setThumbnail(currentSong.thumbnail)
        ]
    })
})
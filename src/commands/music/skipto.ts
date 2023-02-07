import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
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
    const trackNumber = interaction.options.getNumber('tracknumber', true)
    if(trackNumber > queue.tracks.length) return await interaction.reply({
        ephemeral: true,
        content: 'The track number you provided is not valid!',
    })

    queue.skipTo(trackNumber - 1)
    await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setDescription(`${currentSong.title} has been skipped! Moving to track number ${trackNumber}.`)
        ]
    })
})
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Displays the current song queue.')
    .addNumberOption((option) =>
        option
            .setName('page')
            .setDescription('The page number to display.')
            .setRequired(false)
            .setMinValue(1)
    )

export default command(meta, async ({ client, interaction }) => {
    if(!interaction.inGuild()) return interaction.reply({
        ephemeral: true,
        content: 'You can only use this command in a server.'}
    )

    const queue = await client.player.getQueue(interaction.guildId)
    if(!queue || !queue.playing) return interaction.reply({
        ephemeral: true,
        content: 'No songs are currently in the queue.'}
    )

    const totalPages = Math.ceil(queue.tracks.length / 10) || 1
    const page = (interaction.options.getNumber('page') || 1) - 1

    if(page > totalPages) return interaction.reply({
        ephemeral: true,
        content: `The page number must be less than or equal to ${totalPages}.`}
    )

    const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
        return `**${page * 10 + i + 1}**. \`${song.duration}\` [${song.title}](${song.url}) - <@${song.requestedBy.id}>`
    }).join('\n')

    const currentSong = queue.current

    await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setDescription(`**${interaction.guild?.name}'s Queue**`)
                .setFields(
                    {
                        name: 'Currently Playing',
                        value: currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.id}>` : 'Nothing',
                    },
                    {
                        name: 'Up Next',
                        value: queueString || 'Nothing',
                    }
                )
                .setFooter({ text: `Page ${page + 1} of ${totalPages}`, iconURL: interaction.member.avatar! })
                .setThumbnail(currentSong.thumbnail)
                .setTimestamp()
        ]
    })
})
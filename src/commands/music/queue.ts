import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
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
    const embed = new EmbedBuilder()
    
    if(!interaction.inGuild()) {
        embed.setDescription('You can only use this command in a server.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    const queue = await client.player.getQueue(interaction.guildId)

    if(!queue) {
        embed.setDescription('There are no songs in the queue!')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    if (!queue.tracks[0]) {
        embed.setDescription('There aren\'t any other tracks in the queue. Use \`/info\` to show information about the current track.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    const totalPages = Math.ceil(queue.tracks.length / 10) || 1
    const page = (interaction.options.getNumber('page') || 1) - 1

    if(page > totalPages) {
        embed.setDescription(`There are only ${totalPages} pages in the queue.`)
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    const tracks = queue.tracks.slice(page * 10 + 1, page * 10 + 11).map((song, i) => {
        return `**${(page * 10 + (i + 1)).toString().padStart(2, '0')}**. [${song.title}](${song.url}) (<@${song.requestedBy.id}>, \`${song.duration}\`)`
    }).join('\n')
    const progress = queue.createProgressBar();

    embed
        .setDescription(`**Current Track:** [${queue.current.title}](${queue.current.url}) \n${progress}\n\n**Next Up** (Total: ${queue.tracks.length - 1})\n${tracks}`)
        .setFooter({ text: `Page ${page + 1} of ${totalPages}`, iconURL: interaction.member.avatar! })
        .setTimestamp()
        .setThumbnail(queue.current.thumbnail)

    await interaction.reply({
        embeds: [embed]
    })
})
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { QueryType } from 'discord-player'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song or playlist from YouTube.')
    .addSubcommand((subcommand) =>
        subcommand
            .setName('song')
            .setDescription('Play a song from YouTube.')
            .addStringOption((option) =>
                option
                    .setName('url')
                    .setDescription('Provide a song name or URL to play.')
                    .setRequired(true)
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName('playlist')
            .setDescription('Play a playlist from YouTube.')
            .addStringOption((option) =>
                option
                    .setName('url')
                    .setDescription('Provide a playlist name or URL to play.')
                    .setRequired(true)
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName('search')
            .setDescription('Search for a song from YouTube.')
            .addStringOption((option) =>
                option
                    .setName('query')
                    .setDescription('Provide a query to search for.')
                    .setRequired(true)
            )
    )

export default command(meta, async ({ client, interaction }) => {
    if(!interaction.inGuild()) return interaction.reply({
        ephemeral: true,
        content: 'You can only use this command in a server.'}
    )

    const member = await interaction.guild?.members.fetch(interaction.user.id)
    if(!member?.voice.channel) return interaction.reply({
        ephemeral: true,
        content: 'You need to be in a voice channel to use this command.'}
    )

    const queue = await client.player.createQueue(interaction.guildId)
    if(!queue.connection) await queue.connect(member.voice.channel)

    let embed = new EmbedBuilder()

    switch(interaction.options.getSubcommand()) {
        case 'song': {
            let url = interaction.options.getString('url', true)
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO,
            })

            if(!result || !result.tracks.length) return interaction.reply({
                ephemeral: true,
                content: 'No results found.'}
            )

            const song = result.tracks[0]
            await queue.addTrack(song)

            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the queue!`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Requested by ${song.requestedBy.tag}`, iconURL: interaction.user.avatarURL()! })
                .setTimestamp()
            break
        }
        case 'playlist': {
            let url = interaction.options.getString('url', true)
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST,
            })

            const playlist = result.playlist
            if(!playlist) return

            await queue.addTracks(result.tracks)

            embed
                .setDescription(`**[${playlist.title}](${playlist.url})** has been added to the queue!`)
                .setThumbnail(playlist.thumbnail)
                .setFooter({ text: `Author: ${playlist.author}`, iconURL: interaction.user.avatarURL()! })
                .setTimestamp()
            break
        }
        case 'search': {
            let url = interaction.options.getString('query', true)
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            })

            if(!result || !result.tracks.length) return interaction.reply({
                ephemeral: true,
                content: 'No results found.'}
            )

            const song = result.tracks[0]
            await queue.addTrack(song)

            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the queue!`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Requested by ${song.requestedBy.tag}`, iconURL: interaction.user.avatarURL()! })
                .setTimestamp()
            break
        }
    }

    if(!queue.playing) await queue.play()
    
    await interaction.reply({
        embeds: [embed]
    })
})

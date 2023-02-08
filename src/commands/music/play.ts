import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
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
    const embed = new EmbedBuilder()
    const member = await interaction.guild?.members.fetch(interaction.user.id)

    if(!interaction.inGuild()) {
        embed.setDescription('You can only use this command in a server.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    if (
        interaction.guild?.members.me?.voice.channelId
        && member?.voice.channelId !== interaction.guild.members.me.voice.channelId
    ) {
        embed.setDescription("I can't play music in that voice channel.");
        return await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if(!member?.voice.channel) {
        embed.setDescription('You need to be in a voice channel to use this command.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    const queue = client.player.createQueue(interaction.guildId, {
        leaveOnEnd: false,
        leaveOnStop: false,
        leaveOnEmpty: true,
    })

    try {
        if(!queue.connection) await queue.connect(member.voice.channel)
    } catch(err) {
        queue.destroy()
        embed.setDescription(`I could not join your voice channel: ${err}`)
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    switch(interaction.options.getSubcommand()) {
        case 'song': {
            let url = interaction.options.getString('url', true)
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO,
            })

            if(!result || !result.tracks.length) {
                embed.setDescription('No results found.')
                return await interaction.reply({ embeds: [embed], ephemeral: true })
            }

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
            if(!playlist) {
                embed.setDescription('No results found.')
                return await interaction.reply({ embeds: [embed], ephemeral: true })
            }

            await queue.addTracks(result.tracks)

            embed
                .setDescription(`The playlist **[${playlist.title}](${playlist.url})** has been added to the queue!`)
                .setThumbnail(playlist.tracks[0].thumbnail)
                .setFooter({ text: `Total songs: ${playlist.tracks.length}`, iconURL: interaction.user.avatarURL()! })
                .setTimestamp()
            break
        }
        case 'search': {
            let url = interaction.options.getString('query', true)
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            })

            if(!result || !result.tracks.length) {
                embed.setDescription('No results found.')
                return await interaction.reply({ embeds: [embed], ephemeral: true })
            }

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

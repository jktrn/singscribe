/**
 * Plays a song or playlist from YouTube, Spotify, SoundCloud, or Apple Music.
 * @usage /play <query>
 * @param {string} query - A song/playlist to search for. Can be either a URL or a search query.
 */

import { SlashCommandBuilder, WebhookEditMessageOptions } from 'discord.js'
import { QueryType } from 'discord-player'
import { command, Reply, EditReply } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song or playlist from YouTube, Spotify, SoundCloud, or Apple Music.')
    .addStringOption((option) =>
        option
            .setName('query')
            .setDescription('Search for a song or playlist.')
            .setRequired(true),
    )

export default command(meta, async ({ client, interaction }) => {
    // Check if the command was used in a server
    if(!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))

    // Various voice state checks
    const member = await interaction.guild.members.fetch(interaction.user.id)
    const voiceChannel = member.voice.channelId
    const botChannel = interaction.guild.members.me?.voice.channelId
    if(!voiceChannel) return interaction.reply(Reply.error('You need to be in a voice channel to use this command.'))
    if(botChannel && voiceChannel !== botChannel) return interaction.reply(Reply.error('You need to be in the same voice channel as me to use this command.'))

    // Defers reply for "singscribe is thinking..."
    await interaction.deferReply()

    // Gets the queue for the server, or creates a new one if it doesn't exist
    const queue = client.getElseCreateQueue(interaction.guild.id)

    // Tries to connect to the voice channel, catching fails
    try {
        if(!queue.connection) await queue.connect(voiceChannel)
    } catch(err) {
        queue.delete()
        return interaction.editReply(EditReply.error(`I could not join your voice channel: ${err}`))
    }

    // Gets the query from the command options
    const query = interaction.options.getString('query', true)
    if(!query) return interaction.editReply(EditReply.error('You need to provide a search query!'))

    // Searches for the query using the AUTO search engine
    const result = await client.player.search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
    }).catch(() => {})

    // Checks if the result is valid
    if(!result || !result.tracks.length) return interaction.editReply(EditReply.error('No results were found.'))

    let response: WebhookEditMessageOptions

    // Checks if the result is a playlist, creating a different response if it is
    if(result.playlist) {
        queue.addTrack(result.playlist)
        response = EditReply.info(
            `**${result.playlist.title}** has been added to the queue!`,
            result.playlist.thumbnail, 
            { text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL()! }
        )
    } else {
        queue.addTrack(result.tracks[0])
        response = EditReply.info(
            `[**${result.tracks[0].title}**](${result.tracks[0].url}) has been added to the queue!`,
            result.tracks[0].thumbnail,
            { text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL()! }
        )
    }

    // Checks if the queue is currently playing, and if not, starts it
    if (!queue.node.isPlaying()) await queue.node.play()
    await interaction.editReply(response)
})
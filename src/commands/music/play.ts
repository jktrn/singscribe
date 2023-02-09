import { SlashCommandBuilder, WebhookEditMessageOptions } from 'discord.js'
import { QueryType } from 'discord-player'
import { command } from '../../utils'
import { Reply, EditReply } from '../../utils/'

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
    if(!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))

    const member = await interaction.guild.members.fetch(interaction.user.id)
    const voiceChannel = member.voice.channelId
    const botChannel = interaction.guild.members.me?.voice.channelId

    if(!voiceChannel) return interaction.reply(Reply.error('You need to be in a voice channel to use this command.'))
    if(botChannel && voiceChannel !== botChannel) return interaction.reply(Reply.error('You need to be in the same voice channel as me to use this command.'))

    await interaction.deferReply()
    const queue = client.getElseCreateQueue(interaction.guild.id)

    try {
        if(!queue.connection) await queue.connect(voiceChannel)
    } catch(err) {
        queue.delete()
        return interaction.editReply(EditReply.error(`I could not join your voice channel: ${err}`))
    }

    const query = interaction.options.getString('query', true)
    const result = await client.player.search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
    }).catch(() => {})

    if(!result || !result.tracks.length) return interaction.editReply(EditReply.error('No results were found.'))

    try {
        if (!queue.connection) {
            await queue.connect(voiceChannel)
        }
    } catch (error) {
        client.player.nodes.delete(interaction.guild.id)
        return interaction.editReply(EditReply.error(`I could not join your voice channel: ${error}`))
    }

    let response: WebhookEditMessageOptions

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
            `**${result.tracks[0].title}** has been added to the queue!`,
            result.tracks[0].thumbnail,
            { text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL()! }
        )
    }

    if (!queue.node.isPlaying()) await queue.node.play()

    await interaction.editReply(response)
})
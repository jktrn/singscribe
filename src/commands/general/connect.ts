/**
 * Connects the bot to the voice channel you are in to listen to commands.
 * @usage /connect
 */

import { SlashCommandBuilder } from 'discord.js'
import { command, Reply } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('connect')
    .setDescription('Connects the bot to the voice channel you are in to listen to commands.')

export default command(meta, async ({ client, interaction }) => {
    // Check if the command was used in a server
    if(!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))

    const member = await interaction.guild.members.fetch(interaction.user.id)
    const voiceChannel = member.voice.channelId
    const botChannel = interaction.guild.members.me?.voice.channelId

    // Various voice state checks
    if(voiceChannel === botChannel) return interaction.reply(Reply.error('I\'m already connected to your voice channel.'))
    if(voiceChannel !== botChannel) return interaction.reply(Reply.error('You must be in the same voice channel as the bot to use this command.'))
    if(!voiceChannel) return interaction.reply(Reply.error('You must be in a voice channel to use this command.'))

    // Gets queue, or creates one if it doesn't exist
    const queue = client.getElseCreateQueue(interaction.guild.id)
    queue.connect(voiceChannel)

    await interaction.reply(Reply.info('Connected to your voice channel. Hello!'))
})
/**
 * Disconnects the bot from the voice channel it is in.
 * @usage /disconnect
 */

import { SlashCommandBuilder } from 'discord.js'
import { command, Reply } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('disconnect')
    .setDescription('Disconnects the bot from the voice channel it is in, regardless of queue.')

export default command(meta, async ({ interaction }) => {
    if(!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))

    const member = await interaction.guild.members.fetch(interaction.user.id)
    const voiceChannel = member.voice.channelId
    const botChannel = interaction.guild.members.me?.voice

    if(!member.voice.channel) return interaction.reply(Reply.error('You must be in a voice channel to use this command.'))
    if(voiceChannel !== botChannel?.channelId) return interaction.reply(Reply.error('You must be in the same voice channel as the bot to use this command.'))

    botChannel.disconnect()
    await interaction.reply(Reply.info('Disconnected from your voice channel. Goodbye!'))
})
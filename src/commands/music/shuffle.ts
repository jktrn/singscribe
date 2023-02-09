/**
 * Shuffles the current queue.
 * @usage /shuffle
 */

import { SlashCommandBuilder } from 'discord.js'
import { command, Reply } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffles the current queue.')

export default command(meta, async ({ client, interaction }) => {
    // Check if the command was used in a server
    if(!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))

    // Checks if queue exists
    const queue = client.player.nodes.get(interaction.guild.id)
    if(!queue) return interaction.reply(Reply.error('There is nothing playing.'))

    // Checks if the user is in a voice channel
    const member = await interaction.guild.members.fetch(interaction.user.id)
    const voiceChannel = member.voice.channelId
    if(!voiceChannel) return interaction.reply(Reply.error('You must be in a voice channel to use this command.'))

    // Checks if the queue is long enough to shuffle
    if(queue.tracks.size <= 1) return interaction.reply(Reply.error('There are not enough songs to shuffle.'))

    queue.tracks.shuffle()
    await interaction.reply(Reply.info(`The queue of ${queue.tracks.size - 1} songs has been shuffled!`))
})
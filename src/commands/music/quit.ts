/**
 * Leaves the current voice channel and clears the queue.
 * @usage /quit
 */

import { SlashCommandBuilder } from 'discord.js'
import { command, Reply } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('quit')
    .setDescription('Leave the current voice channel and clear the queue.')

export default command(meta, async ({ client, interaction }) => {
    // Check if the command was used in a server
    if(!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))

    // Checks if queue exists
    const queue = client.player.nodes.get(interaction.guild.id)
    if(!queue) return interaction.reply(Reply.error('There is nothing playing.'))

    queue.delete()
    await interaction.reply(Reply.info('Left the voice channel and cleared the queue!'))
})
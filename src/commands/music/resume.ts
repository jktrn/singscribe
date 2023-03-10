/**
 * Resumes the current song, if paused.
 * @usage /resume
 */

import { SlashCommandBuilder } from 'discord.js'
import { command, Reply } from '../../utils'

const meta = new SlashCommandBuilder().setName('resume').setDescription('Resumes the current song, if paused.')

export default command(meta, async ({ client, interaction }) => {
    // Check if the command was used in a server
    if (!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))

    // Checks if queue exists
    const queue = client.player.nodes.get(interaction.guild.id)
    if (!queue) return interaction.reply(Reply.error('There is nothing playing.'))

    queue.node.resume()
    await interaction.reply(Reply.info('Resumed the current song!'))
})

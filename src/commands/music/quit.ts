import { SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('quit')
    .setDescription('Leave the current voice channel and clear the queue.')

export default command(meta, async ({ client, interaction }) => {
    if(!interaction.inGuild()) return interaction.reply({
        ephemeral: true,
        content: 'You can only use this command in a server.',
    })

    const queue = client.player.getQueue(interaction.guildId)
    if(!queue) return await interaction.reply({
        ephemeral: true,
        content: 'There is no music playing.',
    })

    queue.destroy()
    await interaction.reply({
        content: 'Left the voice channel and cleared the queue. Goodbye!'
    })
})
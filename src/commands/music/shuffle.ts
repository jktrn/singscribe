import { SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffle the current queue.')

export default command(meta, async ({ client, interaction }) => {
    if(!interaction.inGuild()) return interaction.reply({
        ephemeral: true,
        content: 'You can only use this command in a server.',
    })

    const queue = client.player.getQueue(interaction.guildId)
    if(!queue) return await interaction.reply({
        ephemeral: true,
        content: 'There are no songs in the queue!',
    })

    queue.shuffle()
    await interaction.reply({
        content: `The queue of ${queue.tracks.length} songs has been shuffled!`
    })
})
import { SlashCommandBuilder } from 'discord.js'
import { command, Reply } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the current song.')

export default command(meta, async ({ client, interaction }) => {
    if(!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))
    
    const queue = client.player.nodes.get(interaction.guild.id)
    if(!queue) return interaction.reply(Reply.error('There is nothing playing.'))

    queue.node.pause()
    await interaction.reply(Reply.info('Paused the current song.'))
})
import { SlashCommandBuilder } from 'discord.js'
import { command, Reply } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffle the current queue.')

export default command(meta, async ({ client, interaction }) => {
    if(!interaction.guild) return interaction.reply(Reply.error('This command can only be used in a server.'))

    const queue = client.player.nodes.get(interaction.guild.id)
    if(!queue) return interaction.reply(Reply.error('There is nothing playing.'))

    const member = await interaction.guild.members.fetch(interaction.user.id)
    const voiceChannel = member.voice.channelId
    if(!voiceChannel) return interaction.reply(Reply.error('You must be in a voice channel to use this command.'))

    if(queue.tracks.size <= 1) return interaction.reply(Reply.error('There are not enough songs to shuffle.'))

    queue.tracks.shuffle()
    await interaction.reply(Reply.info(`The queue of ${queue.tracks.size - 1} songs has been shuffled!`))
})
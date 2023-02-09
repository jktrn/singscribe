import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('disconnect')
    .setDescription('Disconnects the bot from the voice channel it is in.')

export default command(meta, async ({ client, interaction }) => {
    const embed = new EmbedBuilder()

    if(!interaction.guild) {
        embed.setDescription('You can only use this command in a server.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    const member = await interaction.guild.members.fetch(interaction.user.id)
    const voiceChannel = member.voice.channelId
    const botChannel = interaction.guild.members.me?.voice

    if(!member?.voice.channel) {
        embed.setDescription('You need to be in a voice channel to use this command.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    if(voiceChannel !== botChannel?.channelId) {
        embed.setDescription('You need to be in the same voice channel as me to use this command.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    botChannel.disconnect()
    embed.setDescription('Disconnected from the voice channel. Goodbye!')

    await interaction.reply({ embeds: [embed] })
})
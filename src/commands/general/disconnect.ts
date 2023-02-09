import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { getVoiceConnection } from '@discordjs/voice'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('disconnect')
    .setDescription('Disconnects the bot from the voice channel it is in.')

export default command(meta, async ({ client, interaction }) => {
    const embed = new EmbedBuilder()
    const member = await interaction.guild?.members.fetch(interaction.user.id)

    if(!interaction.inGuild()) {
        embed.setDescription('You can only use this command in a server.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    if(!member?.voice.channel) {
        embed.setDescription('You need to be in a voice channel to use this command.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    const connection = getVoiceConnection(interaction.guildId!)

    if(!connection) {
        embed.setDescription('I am not connected to a voice channel.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    connection.destroy()
    embed.setDescription('Disconnected from the voice channel. Goodbye!')

    await interaction.reply({ embeds: [embed] })
})
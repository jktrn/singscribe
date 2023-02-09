import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('connect')
    .setDescription('Connects the bot to the voice channel you are in to listen to commands.')

export default command(meta, async ({ client, interaction }) => {
    const embed = new EmbedBuilder()

    if(!interaction.guild) {
        embed.setDescription('You can only use this command in a server.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    const member = await interaction.guild.members.fetch(interaction.user.id)
    const voiceChannel = member.voice.channelId
    const botChannel = interaction.guild.members.me?.voice.channelId

    if (botChannel && voiceChannel !== botChannel) {
        embed.setDescription("I'm already in another channel.");
        return await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if(!voiceChannel) {
        embed.setDescription('You need to be in a voice channel to use this command.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    const queue = client.getElseCreateQueue(interaction.guild.id)
    queue.connect(voiceChannel)

    embed.setDescription('Connected to the voice channel. Hello!')
    await interaction.reply({ embeds: [embed] })
})
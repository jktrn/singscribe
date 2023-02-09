import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { joinVoiceChannel } from '@discordjs/voice'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('connect')
    .setDescription('Connects the bot to the voice channel you are in to listen to commands.')

export default command(meta, async ({ client, interaction }) => {
    const embed = new EmbedBuilder()
    const member = await interaction.guild?.members.fetch(interaction.user.id)

    if(!interaction.inGuild()) {
        embed.setDescription('You can only use this command in a server.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    if (
        interaction.guild?.members.me?.voice.channelId
        && member?.voice.channelId !== interaction.guild.members.me.voice.channelId
    ) {
        embed.setDescription("I can't play music in that voice channel.");
        return await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if(!member?.voice.channel) {
        embed.setDescription('You need to be in a voice channel to use this command.')
        return await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    await joinVoiceChannel({
        channelId: member.voice.channelId!,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild!.voiceAdapterCreator,
        selfDeaf: false
    })

    embed.setDescription('Connected to the voice channel. Hello!')
    await interaction.reply({ embeds: [embed] })
})
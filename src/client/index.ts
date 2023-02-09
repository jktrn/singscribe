import { Client, ClientOptions } from 'discord.js'
import { Player, GuildQueue } from 'discord-player'
import { registerEvents } from '../utils'
import { playerOptions, intents } from '../config'
import { addSpeechEvent } from 'discord-speech-recognition'
import events from '../events'
import keys from '../keys'
import { joinVoiceChannel } from '@discordjs/voice'

// Custom client with Discord Player
export class CustomClient extends Client {
    public readonly player: Player

    public constructor(options: ClientOptions) {
        super(options)
        this.player = new Player(this, playerOptions)
    }

    public getElseCreateQueue(guildId: string): GuildQueue {
      const queue = this.player.nodes.get(guildId)
      if (queue) return queue
      return this.player.nodes.create(guildId)
    }
}

// Create a new custom client with intent declarations
const client = new CustomClient({
    intents: intents,
}) 

// Binds events + logging to client
registerEvents(client, events)
addSpeechEvent(client)

client.on("messageCreate", (msg) => {
    const voiceChannel = msg.member?.voice.channel;
    if (voiceChannel) {
      joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        selfDeaf: false,
      });
    }
  });

client.on('speech', (msg) => {
    if(!msg.content) return
    console.log(msg.content)
    });

// Login to Discord
client.login(keys.token)
    .catch((err) => {
        console.error('[Login Error]', err)
        process.exit(1)
    })


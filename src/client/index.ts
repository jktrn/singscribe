/**
 * Main client file for the bot
 */

import { registerEvents } from '../utils'
import { CustomClient } from '../types'
import { intents } from '../config'
import events from '../events'
import keys from '../keys'

// Create a new custom client (with player) with intent declarations
const client = new CustomClient({ intents: intents }) 

// Binds events + logging to client
registerEvents(client, events)

// Login to Discord
client.login(keys.token)
    .catch((err) => {
        console.error('[Login Error]', err)
        process.exit(1)
    })

// import { addSpeechEvent } from 'discord-speech-recognition'
// addSpeechEvent(client)

// client.on("messageCreate", (msg) => {
//     const voiceChannel = msg.member?.voice.channel;
//     if (voiceChannel) {
//       joinVoiceChannel({
//         channelId: voiceChannel.id,
//         guildId: voiceChannel.guild.id,
//         adapterCreator: voiceChannel.guild.voiceAdapterCreator,
//         selfDeaf: false,
//       });
//     }
//   });

// client.on('speech', (msg) => {
//     if(!msg.content) return
//     console.log(msg.content)
//     });

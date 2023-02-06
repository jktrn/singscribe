import { Client, GatewayIntentBits, ClientOptions } from 'discord.js'
import { Player } from 'discord-player'
import { registerEvents } from '../utils'
import events from '../events'
import keys from '../keys'

export class CustomClient extends Client {
    public readonly player: Player

    public constructor(options: ClientOptions) {
        super(options)
        this.player = new Player(this, {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25,
            }
        })
    }
}

// Create a new client with intent declarations
const client = new CustomClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
}) 

// Binds events + logging to client
registerEvents(client, events)

// Login to Discord
client.login(keys.token)
    .catch((err) => {
        console.error("[Login Error]", err)
        process.exit(1)
    })
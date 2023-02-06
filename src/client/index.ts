import { Client, GatewayIntentBits, ClientOptions } from 'discord.js'
import { Player } from 'discord-player'
import { registerEvents } from '../utils'
import { playerOptions, intents } from '../config'
import events from '../events'
import keys from '../keys'

// Custom client with Discord Player
export class CustomClient extends Client {
    public readonly player: Player

    public constructor(options: ClientOptions) {
        super(options)
        this.player = new Player(this, playerOptions)
    }
}

// Create a new custom client with intent declarations
const client = new CustomClient({
    intents: intents,
}) 

// Binds events + logging to client
registerEvents(client, events)

// Login to Discord
client.login(keys.token)
    .catch((err) => {
        console.error("[Login Error]", err)
        process.exit(1)
    })
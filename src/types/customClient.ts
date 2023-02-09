import { Client, ClientOptions } from 'discord.js'
import { Player, GuildQueue } from 'discord-player'

export class CustomClient extends Client {
    public readonly player: Player

    // Applies discord-player to client.player
    public constructor(options: ClientOptions) {
        super(options)
        this.player = new Player(this)
    }

    // Get a guild queue or create a new one
    public getElseCreateQueue(guildId: string): GuildQueue {
        const queue = this.player.nodes.get(guildId)
        if (queue) return queue
        return this.player.nodes.create(guildId, {
            leaveOnEnd: false,
            leaveOnStop: false,
            leaveOnEmpty: true,
        })
    }
}

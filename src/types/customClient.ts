import { Client, ClientOptions } from 'discord.js'
import { Player, GuildQueue } from 'discord-player'

/**
 * A subclass of Discord.js' Client class with the addition of a player property.
 * The player property is an instance of the 'discord-player' framework.
 *
 * @extends {Client}
 */

export class CustomClient extends Client {
    public readonly player: Player

    // Applies discord-player to client.player
    public constructor(options: ClientOptions) {
        super(options)
        this.player = new Player(this)
    }

    /**
     * Gets an existing guild queue for the specified guild ID or creates a new one.
     *
     * @param {string} guildId - ID of the guild to get or create the queue for.
     * @returns {GuildQueue} - The guild queue for the specified guild ID.
     */

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

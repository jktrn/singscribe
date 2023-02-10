/**
 * Exports the intents that the bot will use.
 * - Guilds: Allows the bot to see guilds
 * - GuildMembers: Allows the bot to see guild members
 * - GuildMessages: Allows the bot to see guild messages
 * - GuildVoiceStates: Allows the bot to see guild voice states
 */

import { GatewayIntentBits } from 'discord.js'

export const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
]

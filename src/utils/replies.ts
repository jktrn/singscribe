import {
    EmbedFooterData,
    InteractionReplyOptions,
    WebhookEditMessageOptions,
} from 'discord.js'

export const Colors = {
    error: 0xf54242,
    default: 0x294978,
}

export const Reply = {
    
    /**
     * Creates interaction reply options for an error message.
     *
     * @param {string} msg - The error message.
     * @returns {InteractionReplyOptions} The interaction reply options for the error message.
     */

    error(msg: string): InteractionReplyOptions {
        return {
            ephemeral: true,
            embeds: [{
                color: Colors.error,
                description: msg,
            }],
        }
    },

    /**
     * Creates interaction reply options for an informational message.
     *
     * @param {string} msg - The informational message.
     * @param {string} [thumbnail] - The URL of the thumbnail image to be included in the message.
     * @param {EmbedFooterData} [footer] - The footer data to be included in the message.
     * @returns {InteractionReplyOptions} The interaction reply options for the informational message.
     */
    
    info(msg: string, thumbnail?: string, footer?: EmbedFooterData): InteractionReplyOptions {
        return {
            embeds: [{
                color: Colors.default,
                description: msg,
                thumbnail: (thumbnail? {
                    url: thumbnail,
                }: undefined),
                footer,
                timestamp: new Date().toISOString()
            }],
        }
    },
}

/**
 * Equivalent functions for WebhookEditMessageOptions (deferred replies).
 * Does not support ephemeral replies.
 */

export const EditReply = {
    error(msg: string): WebhookEditMessageOptions {
        return {
            embeds: [{
                color: Colors.error,
                description: msg,
            }],
        }
    },

    info(msg: string, thumbnail?: string, footer?: EmbedFooterData ): WebhookEditMessageOptions {
        return {
            embeds: [{
                color: Colors.default,
                description: msg,
                thumbnail: (thumbnail? {
                    url: thumbnail,
                }: undefined),
                footer,
                timestamp: new Date().toISOString()
            }],
        }
    }
}
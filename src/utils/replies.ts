import {
    EmbedFooterData,
    InteractionReplyOptions,
    WebhookEditMessageOptions,
} from 'discord.js'

export const Colors = {
    error: 0xf54242,
    default: 0x3c5885,
}

export const Reply = {
    error(msg: string): InteractionReplyOptions {
        return {
            ephemeral: true,
            embeds: [{
                color: Colors.error,
                description: msg,
            }],
        }
    },

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
import {
    Awaitable,
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js'
import { CustomClient } from '../client'

type LoggerFunction = (...args: unknown[]) => void
export interface CommandProps {
    interaction: ChatInputCommandInteraction
    client: CustomClient
    log: LoggerFunction
}

export type CommandExec =
    (props: CommandProps) => Awaitable<unknown>

export type CommandMeta =
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">

export interface Command {
    meta: CommandMeta
    exec: CommandExec
}

export interface CommandCategory {
    name: string
    commands: Command[]
}
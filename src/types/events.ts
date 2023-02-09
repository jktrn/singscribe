import { ClientEvents, Awaitable } from 'discord.js'
import { CustomClient } from '../types'

type LoggerFunction = (...args: unknown[]) => void
export interface EventProps {
    client: CustomClient
    log: LoggerFunction
}

export type EventKeys = keyof ClientEvents

export type EventExec<T extends EventKeys> =
    (props: EventProps, ...args: ClientEvents[T]) => Awaitable<unknown>

export interface Event<T extends EventKeys> {
    id: T
    exec: EventExec<T>   
}
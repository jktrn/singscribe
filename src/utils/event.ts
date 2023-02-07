import { Event, EventExec, EventKeys } from '../types'
import { CustomClient } from '../client'

// Creates an event function
export function event<T extends EventKeys>(id: T, exec: EventExec<T>): Event<T> {
    return {
        id,
        exec,
    }
}

// Logs events to the console
export function registerEvents(client: CustomClient, events: Event<any>[]): void {
    for (const event of events) {
        client.on(event.id, async (...args) => {
            const props = {
                client,
                log: (...args: unknown[]) =>
                    console.log(`[${event.id}]`, ...args),
            }

            try {
                await event.exec(props, ...args)
            } catch (err) {
                props.log('[Uncaught Error]', err)
            }
        })
    }
}
import { CustomClient, Event, EventExec, EventKeys } from '../types'

/**
 * Creates an Event object.
 *
 * @template T
 * @param {T} id - The identifier for the event.
 * @param {EventExec<T>} exec - The function to be executed when the event is triggered.
 * @returns {Event<T>} The created Event object.
 */

export function event<T extends EventKeys>(id: T, exec: EventExec<T>): Event<T> {
    return {
        id,
        exec,
    }
}

/**
 * Registers events for a CustomClient. Logs uncaught errors to the console.
 *
 * @param {CustomClient} client - The CustomClient to register events for.
 * @param {Event<any>[]} events - An array of Event objects to be registered.
 */

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
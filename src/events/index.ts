import { Event } from '../types'
import ready from './ready'
import interactionCreate from './interactionCreate'

// Add all events to this array
const events: Event<any>[] = [
    ready,
    interactionCreate,
]

export default events
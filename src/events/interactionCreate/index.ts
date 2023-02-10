import { Event } from '../../types'
import commands from './commands'
import help from './help'

// Add all events to this array
const events: Event<any>[] = [commands, help]

export default events

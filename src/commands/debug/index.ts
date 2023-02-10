/**
 * Exports all debug commands for use in the main command handler.
 */

import { category } from '../../utils'
import ping from './ping'

export default category('Debug', [ping], { emoji: '🛠️' })

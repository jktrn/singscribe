/**
 * Exports all general commands for use in the main command handler.
 */

import { category } from '../../utils'
import connect from './connect'
import disconnect from './disconnect'
import help from './help'

export default category('General', [connect, disconnect, help], { emoji: '⚙️' })

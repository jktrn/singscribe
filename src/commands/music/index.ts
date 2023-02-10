/**
 * Exports all music commands for use in the main command handler.
 */

import { category } from '../../utils'
import info from './info'
import pause from './pause'
import play from './play'
import queue from './queue'
import quit from './quit'
import resume from './resume'
import shuffle from './shuffle'
import skip from './skip'
import skipto from './skipto'

export default category('Music', [info, pause, play, queue, quit, resume, shuffle, skip, skipto], { emoji: '🎵' })

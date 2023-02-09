import { category } from '../../utils'
import help from './help'
import connect from './connect'
import disconnect from './disconnect'

export default category('General', [
    help,
    connect,
    disconnect
], {'emoji': '⚙️'} )
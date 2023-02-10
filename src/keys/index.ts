import { Keys } from '../types'

const keys: Keys = {
    token: process.env.TOKEN ?? 'nil',
    testGuild: process.env.TEST_GUILD ?? 'nil',
}

if (Object.values(keys).includes('nil')) throw new Error('Missing environment variables!')

export default keys

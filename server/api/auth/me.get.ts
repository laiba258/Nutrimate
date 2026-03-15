import { getUserSession } from '../../utils/auth'

export default defineEventHandler((event) => {
    return getUserSession(event) ?? null
})

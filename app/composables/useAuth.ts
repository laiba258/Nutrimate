export interface AuthUser {
    id: number
    name: string
    email: string
    role: 'admin' | 'user'
}

export const useAuth = () => {
    const user = useState<AuthUser | null>('auth_user', () => null)

    const loadUser = async () => {
        try {
            const data = await $fetch<AuthUser>('/api/auth/me')
            user.value = data
        } catch {
            user.value = null
        }
    }

    const register = async (name: string, email: string, password: string) => {
        const data = await $fetch<AuthUser>('/api/auth/register', {
            method: 'POST',
            body: { name, email, password },
        })
        user.value = data
        return data
    }

    const login = async (email: string, password: string) => {
        const data = await $fetch<AuthUser>('/api/auth/login', {
            method: 'POST',
            body: { email, password },
        })
        user.value = data
        return data
    }

    const logout = async () => {
        await $fetch('/api/auth/logout', { method: 'POST' })
        user.value = null
    }

    const isAdmin = computed(() => user.value?.role === 'admin')
    const isLoggedIn = computed(() => !!user.value)

    return { user, isAdmin, isLoggedIn, loadUser, register, login, logout }
}

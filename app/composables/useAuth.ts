export interface AuthUser {
    id: string
    name: string
    email: string
    role: 'admin' | 'user'
    createdAt: string
}

export const useAuth = () => {
    const user = useState<AuthUser | null>('auth_user', () => null)

    const loadFromStorage = () => {
        if (import.meta.client) {
            const stored = localStorage.getItem('nutrimate_user')
            if (stored) user.value = JSON.parse(stored)
        }
    }

    const getUsers = (): AuthUser[] => {
        if (!import.meta.client) return []
        return JSON.parse(localStorage.getItem('nutrimate_users') || '[]')
    }

    const saveUsers = (users: AuthUser[]) => {
        localStorage.setItem('nutrimate_users', JSON.stringify(users))
    }

    const register = (name: string, email: string, password: string): { success: boolean; error?: string } => {
        const users = getUsers()
        if (users.find(u => u.email === email)) {
            return { success: false, error: 'Email already registered' }
        }
        const isFirst = users.length === 0
        const newUser: AuthUser = {
            id: crypto.randomUUID(),
            name,
            email,
            role: isFirst ? 'admin' : 'user',
            createdAt: new Date().toISOString(),
        }
        // Store password separately (hashed in real app)
        const passwords = JSON.parse(localStorage.getItem('nutrimate_passwords') || '{}')
        passwords[newUser.id] = password
        localStorage.setItem('nutrimate_passwords', JSON.stringify(passwords))
        users.push(newUser)
        saveUsers(users)
        user.value = newUser
        localStorage.setItem('nutrimate_user', JSON.stringify(newUser))
        return { success: true }
    }

    const login = (email: string, password: string): { success: boolean; error?: string } => {
        const users = getUsers()
        const found = users.find(u => u.email === email)
        if (!found) return { success: false, error: 'No account found with this email' }
        const passwords = JSON.parse(localStorage.getItem('nutrimate_passwords') || '{}')
        if (passwords[found.id] !== password) return { success: false, error: 'Incorrect password' }
        user.value = found
        localStorage.setItem('nutrimate_user', JSON.stringify(found))
        return { success: true }
    }

    const logout = () => {
        user.value = null
        localStorage.removeItem('nutrimate_user')
    }

    const isAdmin = computed(() => user.value?.role === 'admin')
    const isLoggedIn = computed(() => !!user.value)

    const updateUserRole = (id: string, role: 'admin' | 'user') => {
        const users = getUsers()
        const idx = users.findIndex(u => u.id === id)
        if (idx !== -1) {
            users[idx]!.role = role
            saveUsers(users)
            if (user.value?.id === id) {
                user.value = { ...user.value, role }
                localStorage.setItem('nutrimate_user', JSON.stringify(user.value))
            }
        }
    }

    const deleteUser = (id: string) => {
        const users = getUsers().filter(u => u.id !== id)
        saveUsers(users)
        const passwords = JSON.parse(localStorage.getItem('nutrimate_passwords') || '{}')
        delete passwords[id]
        localStorage.setItem('nutrimate_passwords', JSON.stringify(passwords))
    }

    return { user, isAdmin, isLoggedIn, loadFromStorage, register, login, logout, getUsers, updateUserRole, deleteUser }
}

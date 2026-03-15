export default defineNuxtRouteMiddleware(async () => {
    const { user, loadUser } = useAuth()
    if (!user.value) await loadUser()
    if (!user.value) return navigateTo('/login')
    if (user.value.role !== 'admin') return navigateTo('/')
})

export default defineNuxtRouteMiddleware((to) => {
    if (to.path.startsWith('/admin/login')) return
    const { isAdmin, isLoggedIn } = useAuth()
    if (!isLoggedIn.value) return navigateTo('/login')
    if (!isAdmin.value) return navigateTo('/')
})

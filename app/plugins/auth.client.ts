export default defineNuxtPlugin(async () => {
    const { loadUser } = useAuth()
    await loadUser()
})

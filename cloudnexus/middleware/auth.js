// middleware/auth.js
import { useAuth0 } from '@auth0/auth0-vue'

export default defineNuxtRouteMiddleware(async (to, from, next) => {
    const { isAuthenticated, loginWithRedirect, checkSession } = useAuth0()

    if (process.client) {
        try {
            await checkSession()
            if (!isAuthenticated.value) {
                await loginWithRedirect({
                    appState: {
                        target: to.fullPath,
                    },
                })
            } else {
                next()
            }
        } catch (error) {
            await loginWithRedirect({
                appState: {
                    target: to.fullPath,
                },
            })
        }
    } else {
        next()
    }
})

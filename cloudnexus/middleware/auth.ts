export default defineNuxtRouteMiddleware(async (to, from) => {

    if (process.server) return;

    const token = localStorage.getItem('token');

    if (!token && to.path !== '/login') {
        return navigateTo('/login');
    }

    if (token) {
        try {
            const data = await $fetch('/api/verify-token', {
                method: 'POST',
                body: { token }
            });

            console.log('Verification response:', data);

            if (data?.status === 'success') {
                useState('user', () => data.user);
                if (to.path === '/login') {
                    return navigateTo('/dashboard');
                }
                return true;
            } else {
                if (to.path !== '/login') {
                    return navigateTo('/login');
                }
            }
        } catch (error) {
            console.error('Verification failed:', error);
            if (to.path !== '/login') {
                return navigateTo('/login');
            }
        }
    } else {
        if (to.path !== '/login') {
            console.log('No token, redirecting to login');
            return navigateTo('/login');
        }
    }
});

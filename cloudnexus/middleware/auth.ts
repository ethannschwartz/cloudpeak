// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const user = useCookie('userCookie');
    const userState = useState('user', () => user);

    user.value = userState.value;

    console.log('user:',user.value);

    if (!userState.value && to.path !== '/login') {
        return navigateTo('/login');
    }

    // Allow navigation if user is authenticated or is on the login page
    if (userState.value || to.path === '/login') {
        return true;
    }

    // Default navigation
    return navigateTo(to.fullPath);
});

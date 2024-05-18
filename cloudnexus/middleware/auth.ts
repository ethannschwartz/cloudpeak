export default defineNuxtRouteMiddleware((to, from) => {
    const user = useState('user'); // Adjust this to your state management logic

    if (!user.value) {
        // Redirect to login page
        return navigateTo('/login');
    }
});

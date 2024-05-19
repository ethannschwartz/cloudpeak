export default defineNuxtRouteMiddleware((to, from) => {
    console.log('Hi from Nuxt Middleware!', useState('user').value)

    // const user = useState('user'); // Adjust this to your state management logic
    //
    // if (!user.value) {
    //     // Redirect to login page
    //     return navigateTo('/login');
    // }
});

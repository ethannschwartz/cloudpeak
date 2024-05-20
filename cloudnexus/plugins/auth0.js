import {createAuth0} from "@auth0/auth0-vue";

export default defineNuxtPlugin((nuxtApp) => {
    const auth0 = createAuth0({
        domain: "cloudpeak.us.auth0.com",
        clientId: "HVWDvE6SVk8B9ls7UNV9jjffM9leAT71",
        useRefreshTokens: true,
        authorizationParams: {
            redirect_uri: 'http://localhost:3000',
        },
    })

    // if (process.client) {
        nuxtApp.vueApp.use(auth0);
    // }
})

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('click-outside', {
        beforeMount(el, binding) {
            el.clickOutsideEvent = function (event) {
                if (!(el === event.target || el.contains(event.target))) {
                    binding.value(event);
                }
            };
        },
        updated(el, binding) {
            // Check if the binding value is true (dropdown is open)
            if (binding.value) {
                // Add event listener if it's not already added
                if (!el.clickOutsideEventRegistered) {
                    document.body.addEventListener('click', el.clickOutsideEvent);
                    el.clickOutsideEventRegistered = true;
                }
            } else {
                // Remove event listener if dropdown is closed
                document.body.removeEventListener('click', el.clickOutsideEvent);
                el.clickOutsideEventRegistered = false;
            }
        },
        unmounted(el) {
            document.body.removeEventListener('click', el.clickOutsideEvent);
        },
    });
});

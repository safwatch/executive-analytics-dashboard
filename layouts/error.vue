<script>
import Error404 from "~/pages/extras/404.vue";
import Error500 from "~/pages/extras/500.vue";

/**
 * Error layout
 */
export default {
    // props: ['error'],
    props: {
        error: {
            type: Object,
            default: () => {},
        },
    },
    name: "nuxt-error",
    components: {
        Error404,
        Error500,
    },
    data() {
        return {};
    },
    computed: {
        errorPage() {
            if (this.error.statusCode === 404) {
                return Error404;
            }
            // catch everything else
            return Error500;
        },
    }
    // layout: 'error'
};
</script>

<template>
<div class="nuxt-error">
    <component :is="errorPage" :error="error" />
</div>
</template>

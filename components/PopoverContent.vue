<template>
    <b-popover ref="popover" :target="target" triggers="manual" placement="right" custom-class="custom-popover"
        v-if="visible">
        <template v-slot:title>
            {{ header }}
        </template>
        <div>
            <p v-if="loading">Loading...</p>
            <p v-else-if="error">{{ error }}</p>
            <p v-else>{{ content }}</p>
        </div>
    </b-popover>
</template>

<script>
export default {
    name: 'PopoverContent',
    props: {
        target: {
            type: String,
            required: true,
            default: ''
        }
    },
    data() {
        return {
            header: 'Popover Header',
            content: '',
            loading: false,
            error: null,
            visible: false
        };
    },
    watch: {
        target(newVal) {
            if (newVal) {
                this.show();
            }
        }
    },
    methods: {
        async fetchContent() {
            this.loading = true;
            this.error = null;
            try {
                // Using JSONPlaceholder API for testing
                const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
                const data = await response.json();
                this.header = data.title;
                this.content = data.body;
            } catch (err) {
                this.error = 'Failed to load content';
            } finally {
                this.loading = false;
            }
        },
        async show() {
            await this.fetchContent();
            this.visible = true;
        },
        hide() {
            this.visible = false;
        }
    }
};
</script>

<style>
.custom-popover .popover-header {
    background-color: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
}

.custom-popover .popover-body {
    padding: 0.5rem 1rem;
}
</style>
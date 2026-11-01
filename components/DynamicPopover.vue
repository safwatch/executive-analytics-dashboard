<template>
    <div>
        <a href="javascript:void(0)" :id="targetId" v-b-popover.hover="popoverContent" @mouseenter="fetchContent">
            <slot></slot>
        </a>
        <b-popover :target="targetId" triggers="hover" placement="right">
            <template v-slot:default>
                <b-card>
                    <b-card-header v-if="loading || error || header">{{ header }}</b-card-header>
                    <b-card-body>
                        <div v-if="loading">Loading...</div>
                        <div v-else-if="error">{{ error }}</div>
                        <div v-else>{{ content }}</div>
                    </b-card-body>
                </b-card>
            </template>
        </b-popover>
    </div>
</template>

<script>
export default {
    props: {
        targetId: {
            type: String,
            required: true
        },
        apiUrl: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            header: '',
            content: '',
            loading: false,
            error: null,
            popoverContent: ''
        };
    },
    methods: {
        async fetchContent() {
            this.loading = true;
            this.error = null;
            try {
                const response = await fetch(this.apiUrl);
                const data = await response.json();
                this.header = data.title; // Assuming the API returns a title for the header
                this.content = data.body; // Assuming the API returns a body for the content
                this.popoverContent = `<div><strong>${this.header}</strong><br>${this.content}</div>`;
            } catch (err) {
                this.error = 'Failed to load content';
                this.popoverContent = this.error;
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

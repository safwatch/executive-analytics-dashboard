<template>
    <div :class="shimmerClass" :style="shimmerStyle">
        <div class="shimmer"></div>
    </div>
</template>

<script>
import SimpleShimmer from "simple-shimmer";

export default {
    name: "SieShimmer",
    components: {
        SimpleShimmer
    },
    props: {
        shape: {
            type: String,
            default: "rectangle", // rectangle, circle
        },
        width: {
            type: String,
            default: "100%", // Accepts any valid CSS width value
        },
        height: {
            type: String,
            default: "20px", // Accepts any valid CSS height value
        },
        borderRadius: {
            type: String,
            default: "4px", // Accepts any valid CSS border-radius value
        },
        duration: {
            type: String,
            default: "1.2s", // Duration of the shimmer effect
        },
        backgroundColor: {
            type: String,
            default: "#f6f7f8", // Background color of the shimmer
        },
        shimmerColor: {
            type: String,
            default: "#e0e0e0", // Shimmer color
        },
    },
    computed: {
        shimmerClass() {
            return {
                'shimmer-circle': this.shape === 'circle',
                'shimmer-rectangle': this.shape === 'rectangle',
            };
        },
        shimmerStyle() {
            return {
                width: this.shape === 'circle' ? this.height : this.width,
                height: this.height,
                borderRadius: this.shape === 'circle' ? '50%' : this.borderRadius,
                backgroundColor: this.backgroundColor,
                position: 'relative',
                overflow: 'hidden',
            };
        },
    },
};
</script>

<style scoped>
.shimmer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(90deg,
            transparent,
            rgba(255, 255, 255, 0.9),
            transparent);
    animation: shimmer 1.2s infinite;
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}
</style>
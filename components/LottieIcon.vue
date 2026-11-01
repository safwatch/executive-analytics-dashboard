<template>
    <div ref="lottieContainer"></div>
  </template>
  
  <script>
  import lottie from 'lottie-web';
  
  export default {
    props: {
      animationData: {
        type: Object,
        required: true,
      },
      loop: {
        type: Boolean,
        default: true,
      },
      autoplay: {
        type: Boolean,
        default: true,
      },
    },
    mounted() {
      // Initialize Lottie animation
      this.animation = lottie.loadAnimation({
        container: this.$refs.lottieContainer,
        renderer: 'svg',
        loop: this.loop,
        autoplay: this.autoplay,
        animationData: this.animationData,
      });
    },
    beforeDestroy() {
      // Destroy animation when component is destroyed
      if (this.animation) {
        this.animation.destroy();
      }
    },
  };
  </script>
  
  <style scoped>
  /* Optional: adjust the size of your Lottie container */
  div {
    width: 100px;
    height: 100px;
  }
  </style>
  
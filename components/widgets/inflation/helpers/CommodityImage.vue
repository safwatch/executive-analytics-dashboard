<template>
    <img :src="imageUrl" :alt="altText" />
  </template>
  
  <script>
  export default {
    props: {
      // The image URL, which will be checked
      src: {
        type: String,
        required: true,
      },
      altText: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        imageUrl: this.src,  // Default to the passed URL
      };
    },
    watch: {
      // Watch for changes to the src prop
      src(newVal) {
        // Check if the new image exists
        this.checkImageExists(newVal).then((exists) => {
          this.imageUrl = exists ? newVal : '/commodity/no-image.svg'; // Update URL based on existence
        });
      },
    },
    methods: {
      // Method to check if the image exists by making a request
      checkImageExists(url) {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true); // Image loaded successfully
          img.onerror = () => resolve(false); // Image failed to load
          img.src = url; // Set the image source to the URL
        });
      },
    },
    created() {
      // Initial check when the component is created
      this.checkImageExists(this.src).then((exists) => {
        this.imageUrl = exists ? this.src : '/commodity/no-image.svg'; // Set image URL or fallback
      });
    },
  };
  </script>
  
<template>
  <div class="custom-loading-overlay">
    <img src="loading-spinner.gif" alt="Loading..." /> Loading data...
  </div>
</template>

<script>
export default {
  name: 'CustomLoadingOverlay',
};
</script>

<style>
.custom-loading-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

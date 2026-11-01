<template>
  <div class="tableau-wrapper">
    <!-- Container for the Tableau visualization -->
    <div v-if="error" class="error badge badge-danger fs-11">{{ error }}</div>
    <div v-else id="tableauViz" ref="tableauContainer"></div>
  </div>
</template>

<script>
export default {
  props: {
    tableauView: {
      type: String,
      required: true, // URL of the Tableau dashboard
    },
    username: {
      type: String,
      required: true, // Username for which to generate a trusted ticket
    },
    options: {
      type: Object,
      default: () => ({
        hideTabs: true, // Hide Tableau tabs
        toolbar: 'hidden', // Hide Tableau toolbar (optional)
      }),
    },
  },
  data() {
    return {
      viz: null, // Tableau Viz instance
      error: null,
    };
  },
  mounted() {
    this.initTableau();
    window.addEventListener("resize", this.adjustScaling); // Recalculate scaling on resize
  },
  beforeDestroy() {
    if (this.viz) {
      this.viz.dispose(); // Clean up Tableau Viz instance
    }
    window.removeEventListener("resize", this.adjustScaling);
  },
  methods: {
    async initTableau() {
      try {
        const tableau = await this.$tableau;
        const trustedTicketUrl = await this.fetchTrustedTicket();

        if (!trustedTicketUrl) {
          throw new Error("Failed to fetch Tableau trusted ticket.");
        }

        const container = this.$refs.tableauContainer;

        // Initialize Tableau Viz with trusted ticket URL
        this.viz = new tableau.Viz(container, trustedTicketUrl, this.options);

        console.log("Tableau Viz initialized");

        // Adjust scaling after the dashboard is loaded
        this.viz.addEventListener(
          tableau.TableauEventName.FIRST_INTERACTIVE,
          this.adjustScaling
        );
      } catch (error) {
        this.error = `Gagal memuat Tableau Viz: ${error.message} Coba beberapa saat lagi.`;
        console.error(this.error);
      }
    },
    async fetchTrustedTicket() {
      return this.$tableauTrustedTicketRepo.getById(this.username)
        .then(response => {
          if (response.ticket) {
            // Construct the Tableau visualization URL with the trusted ticket
            return `https://tableau.civickota.go.id/trusted/${response.ticket}/views/${this.tableauView}?:embed=y&:showVizHome=no`;
          } else {
            throw new Error("Trusted ticket not returned from backend.");
          }
        })
        .catch(error => {
          console.error("Error fetching trusted ticket:", error);
          this.error = error.response?.data?.error || "An error occurred.";
          return null; // Return null to indicate failure
        })
        .finally(() => {
          console.log("Finished fetching the trusted ticket.");
        });
    },
    adjustScaling() {
      // Adjust scaling based on container dimensions
      const container = this.$refs.tableauContainer;
      const parentWidth = container.parentElement.offsetWidth;
      const parentHeight = container.parentElement.offsetHeight;

      const scaleX = parentWidth / container.offsetWidth;
      const scaleY = parentHeight / container.offsetHeight;

      const scale = Math.min(scaleX, scaleY); // Uniform scaling

      // Apply scaling
      container.style.transform = `scale(${scale})`;
      container.style.transformOrigin = "left top"; // Keep scaling aligned to top-left
    },
  },
};
</script>

<style scoped>
/* Wrapper to center Tableau visualization */
.tableau-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* Full viewport height */
  width: 100%;
  /* Full width */
  overflow: hidden;
  /* Prevent scrollbars */
}

/* Tableau container */
#tableauViz {
  transform-origin: left top;
  /* Align scaling to the top-left corner */
  transform: scale(1);
  /* Default scale */
  display: flex;
  justify-content: center;
  /* Center content horizontally */
  position: relative;
  /* Position relative for better scaling */
  width: 100%;
  /* Allow content to scale */
  height: auto;
  /* Adjust height dynamically */
}
</style>

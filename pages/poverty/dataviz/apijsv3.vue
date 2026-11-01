<script>
import TableauEmbed from "~/components/TableauEmbed.vue";

export default {
  head() {
    return {
      title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`,
    };
  },
  name: "api-js-v3",
  components: {
    TableauEmbed,
  },
  data() {
    return {
      title: "Tableau DataViz",
      items: [
        {
          text: "Sampeu",
          href: "/",
        },
        {
          text: "Kemiskinan",
          href: "/",
        },
        {
          text: "Data Viz Responsive",
          active: true,
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xl-12">
        <TableauEmbed
                  :tableauView="'DashboardTesting/CustomerSummary'"
                  :options="{ hideTabs: true, toolbar: 'hidden' }"
                  :username="'tabadmin'"
                />
      </div>
    </div>
  </div>
</template>

<style scoped>
#app-viz {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

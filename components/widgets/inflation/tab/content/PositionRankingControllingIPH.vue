<template>
    <div class="py-2 w-100">
      <div class="card-body bg-transparent">
        <div class="d-flex justify-content-between">
          <div>
            <h5 class="text-muted font-weight-normal mt-0 text-truncate fs-13">Update data terakhir : <b-badge class="badge-soft-success">{{ month }} {{ week_reference }} - {{ year }} </b-badge></h5>
            <h3 class="my-2 py-1">
              Peringkat ke-{{ ranking }} di Jawa Barat
            </h3>
            <p class="mb-0 text-muted">
              Indeks Perkembangan Harga (IPH): <b-badge class="badge-outline-primary" pill>{{ iph }}%</b-badge>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      ranking: {
        type: Number,
        required: true,
      },
      iph: {
        type: String,
        required: true,
      },
      month: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      week_reference: {
        type: String,
        required: true,
      },
      latest_iph: {
        type: String,
        required: true,
      },
      prev_iph: {
        type: String,
        required: true,
      },
      iph_change: {
        type: Number,
        required: true,
      }
    }
  };
  </script>
  
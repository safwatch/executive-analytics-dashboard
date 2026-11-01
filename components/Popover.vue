<template>
    <div>
      <a href="javascript:void(0);" id="custom-popover-target" class="text-muted" variant="light">
        <i class="fa fa-info-circle"></i>
      </a>
  
      <b-popover target="custom-popover-target" triggers="hover" placement="right" custom-class="custom-popover">
        <template v-slot:title>
          Year on Year (YoY)
        </template>
        <div>
            Metrik yang digunakan untuk mengukur perubahan harga barang dan jasa selama periode satu tahun. Ini adalah cara untuk menilai tingkat inflasi dari satu tahun ke tahun berikutnya dengan membandingkan indeks harga konsumen (CPI) atau indeks harga lainnya dari satu bulan atau kuartal pada tahun ini dengan bulan atau kuartal yang sama pada tahun sebelumnya.
        </div>
      </b-popover>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomPopover'
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
  
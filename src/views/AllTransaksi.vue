<template>
  <div class="container" id="table-container">
    <table class="table table-striped">
      <thead class="justify-content-center">
        <tr>
          <th scope="col" id="id">ID</th>
          <th>Nama Transaksi</th>
          <th id="tanggal">Tanggal</th>
          <th>MataAnggaran</th>
          <th id="rp"></th>
          <th>Jumlah</th>
          <th>Status</th>
          <th>Keterangan</th>
          <th id="action">Action</th>
        </tr>
      </thead>
      <tbody>
        <Transaksi
          v-for="transaksi in transaksis"
          :key="transaksi.id"
          :transaksi="transaksi"
        >
        </Transaksi>
      </tbody>
    </table>
  </div>
</template>

<script>
import Transaksi from "../components/Transaksi";

export default {
  name: "AllTransaksi",
  components: {
    Transaksi
  },
  computed: {
    transaksis() {
      return this.$store.state.transaksis;
    }
  },
  created() {
    this.$store.dispatch("fatchTransaksi");
  }
};
</script>




<style>
.table {
  /* display: flex; */
  /* justify-content: center; */
  width: 35cm;
}
#action {
  width: 8cm;
}
#tanggal {
  width: 4cm;
}
#id {
  width: 15mm;
}
#rp {
  width: 3mm;
}
#table-container {
  width: 2000mm;
}
</style>
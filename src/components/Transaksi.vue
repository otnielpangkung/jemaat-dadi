<template>
  <tr class="list-table">
    <th scope="row">{{ transaksi.id }}</th>
    <td class="text-left" id="nama-transaksi">{{ transaksi.namaTransaksi }}</td>
    <td class="text-left">{{ transaksi.tanggal.slice(0, 10) }}</td>
    <td class="text-left">
      {{ transaksi[`MataAnggaran${namaCabang}`].namaMA }}
    </td>
    <td id="data-uang">Rp.</td>
    <td class="text-right">{{ formatUang(transaksi.jumlah) }}</td>
    <td>{{ transaksi.status }}</td>
    <td class="text-left">{{ transaksi.keterangan }}</td>

    <td class="td-width">
      <button
        id="edit-button"
        type="button"
        class="btn btn-primary margin-button"
        @click.prevent="editStatus(transaksi.id)"
      >
        Open
      </button>
      <button
        id="edit-button"
        type="button"
        class="btn btn-primary margin-button"
        @click="setCurrentTransaksi(transaksi)"
      >
        EDIT
      </button>
      <button
        type="button"
        class="btn btn-danger"
        @click.prevent="deleteTransaksi(transaksi.id)"
      >
        DELETE
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Transaksi",
  props: ["transaksi"],
  methods: {
    editStatus(transaksi) {
      // console.log("masuuk edit", id);
      this.$store
        .dispatch("editStatus", transaksi)
        .then(data => {
          localStorage.getItem("access_token");
          // console.log(id, "has been open");
          this.$store.dispatch("fatchTransaksi");
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatUang(data) {
      let uang = "";
      data = data.toString();
      for (let i = 0; i < data.length; i++) {
        if ((data.length - i) % 3 == 0 && i !== 0) {
          uang += `.${data[i]}`;
        } else {
          uang += data[i];
        }
      }
      return uang;
    },
    deleteTransaksi(id) {
      localStorage.getItem("access_token");
      this.$store.dispatch("deleteTransaksi", id);
    },
    setCurrentTransaksi(transaksi) {
      // console.log(transaksi, "<<product");
      this.$store.commit("setCurrentTransaksi", transaksi);
      this.$router.push("/editpage");
    }
  },
  computed: {
    namaCabang() {
      return localStorage.getItem("cabang").toUpperCase();
    }
  },
  created() {
    this.$store.dispatch("fatchTransaksi");
  }
};
</script>

<style>
#data-uang {
  display: flex;
}
#edit-button {
  margin-right: 2mm;
}
#nama-transaksi {
  display: flex;
}
.list-table {
  max-height: 5mm;
}
</style>
<template>
  <tr>
    <th scope="row">{{ transaksi.id }}</th>
    <td class="text-left">{{ transaksi.namaTransaksi }}</td>
    <td class="">{{ transaksi.tanggal.slice(0, 10) }}</td>
    <td class="text-left">
      {{
        transaksi[`MataAnggaran${namaCabang}`].namaMA
          ? transaksi[`MataAnggaran${namaCabang}`].namaMA
          : ""
      }}
    </td>
    <td>Rp.</td>
    <td class="text-right">{{ formatUang(transaksi.jumlah) }}</td>
    <td>{{ transaksi.keterangan }}</td>
    <td>{{ transaksi.status }}</td>

    <td class="td-width">
      <button
        id="edit-button"
        type="button"
        class="btn btn-primary margin-button"
        @click.prevent="editStatus(transaksi.id)"
      >
        Open
      </button>
      <button type="button" class="btn btn-primary margin-button">
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
  name: "TransaksiByDate",
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
    deleteTransaksi(id) {
      this.$store.dispatch("deleteTransaksi", id);
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
    }
  },
  computed: {
    namaCabang() {
      return localStorage.getItem("cabang").toUpperCase();
    }
  }
};
</script>

<style>
</style>
<template>
  <div class="col-100%">
    <div class="container startdate">
      <div class="form-group row" id="formtanggal">
        <label for="exampleInput11" class="col-sm-4 col-form-label"
          >Start Date :</label
        >
        <div class="col-sm-8">
          <input
            type="date"
            v-model="startDate"
            class="form-control"
            aria-describedby="emailHelp"
          />
        </div>
      </div>
      <div class="form-group row" id="formtanggal">
        <div id="sampai">
          <label for="exampleInput11" class="col-sm-4 col-form-label"> </label>
        </div>
        <div class="col-sm-8">
          <input
            type="date"
            v-model="endDate"
            class="form-control"
            aria-describedby="emailHelp"
          />
        </div>
      </div>

      <button type="button" class="btn btn-link" @click="getTransaksiPeriode">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 24 24"
        >
          <path
            d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"
          />
        </svg>
      </button>
      <button
        type="button"
        class="btn btn-link"
        @click.prevent="downloadReport()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 24 24"
        >
          <path
            d="M15.003 3h2.997v5h-2.997v-5zm8.997 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9z"
          />
        </svg>
      </button>
    </div>
    <div class="container" id="form-mata-anggaran">
      <label
        for="exampleInput11"
        class="col-sm-3 col-form-label"
        id="form-mata-anggaran"
        >Mata Anggaran :</label
      >
      <select
        v-model="mataAnggaranId"
        class="col-sm-9 "
        id="form-mata-anggaran2"
      >
        <option
          v-for="mataanggaran in listma"
          :key="mataanggaran.id"
          :value="mataanggaran.id"
        >
          {{ `${mataanggaran.code} - ${mataanggaran.namaMA}` }}
        </option>
      </select>
    </div>
    <div class="container">
      <table class="table" id="table-transaksi">
        <thead class="justify-content-center">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nama Transaksi</th>
            <th scope="col">Tanggal</th>

            <th scope="col">MataAnggaran</th>
            <th scope="col"></th>
            <th scope="col">Jumlah</th>
            <th scope="col">Keterangan</th>
            <th scope="col">status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <TransaksiByDate
            v-for="transaksi in transaksiList"
            :key="transaksi.id"
            :transaksi="transaksi"
          >
          </TransaksiByDate>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "../api/axios";
import TransaksiByDate from "../components/TransaksiByDate";

export default {
  name: "TanggalLaporanBulanan",
  components: {
    TransaksiByDate
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      mataAnggaranId: 0,
      transaksiList: [],
      listma: []
    };
  },
  methods: {
    downloadReport() {
      // console.log("download 2");
      const doc = new jsPDF();
      doc.autoTable({
        html: "#table-transaksi",
        // styles: { fillColor: [255, 0, 0] },
        columnStyles: { 5: { halign: "right" }, 8: { fontSize: 1 } }
      });

      doc.save("table2.pdf");
    },
    getTransaksiPeriode() {
      let data = {
        startDate: this.startDate,
        endDate: this.endDate,
        mataAnggaranId: this.mataAnggaranId
      };
      return axios({
        method: "get",
        headers: { access_token: localStorage.getItem("access_token") },
        url: `/${this.$store.state.currentCabang}/periode`,
        params: data
      })
        .then(({ data }) => {
          this.transaksiList = data;
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMataAnggaran() {
      return axios
        .get(`/${this.$store.state.currentCabang}/mataanggaran`)
        .then(({ data }) => {
          console.log(this.$store.state.currentCabang, "datra mata anggaran");
          console.log(data, "datra mata anggaran");
          this.listma = data;
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
    }
  },
  created() {
    this.getMataAnggaran();
  }
};
</script>

<style>
#mataanggaran {
  display: flex;
  justify-content: right;
}
#sampai {
  width: 15px;
}
#container {
  display: flex;
}
#formtanggal {
  width: 40vw;

  align-content: center;
  align-items: center;
}

#form-mata-anggaran {
  display: flex;
  width: 50vw;
  margin-left: 50mm;
}
#mataanggaran {
  width: 30mm;
}
.spasi {
  margin-top: 15mm;
}
</style>
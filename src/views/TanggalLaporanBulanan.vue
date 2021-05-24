<template>
  <div class="row">
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
        <label for="exampleInput11" class="col-sm-4 col-form-label"
          >End Date :</label
        >
        <div class="col-sm-8">
          <input
            type="date"
            v-model="endDate"
            class="form-control"
            aria-describedby="emailHelp"
          />
        </div>
      </div>
      <div id="mataanggaran">
        <div id="form-mata-anggaran">
          <label
            for="exampleInput11"
            class="col-sm-3 col-form-label"
            id="form-mata-anggaran"
            >Mata Anggaran :</label
          >
          <select
            v-model="mataAnggaranId"
            class="col-sm-9"
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
      </div>

      <button type="button" class="btn btn-link" @click="getTransaksiPeriode">
        FIND
      </button>
    </div>
    <div class="container">
      <table class="table">
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
    <div class="spasi"></div>
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
  /* margin-bottom: 5mm; */
}
#mataanggaran {
  width: 30mm;
}
.spasi {
  margin-top: 15mm;
}
</style>
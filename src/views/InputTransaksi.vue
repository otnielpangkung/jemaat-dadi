<template>
  <div class="container-input">
    <div class="layout-form">
      <form @submit.prevent="addTransaksi" id="form-input">
        <div class="form-group row">
          <label for="exampleInput11" class="col-sm-4 col-form-label"
            >Nama Transaksi</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              v-model="namaTransaksi"
              class="form-control"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
        <div class="form-group row">
          <label
            for="exampleInput11"
            class="col-sm-4 col-form-label"
            id="label-form"
            >Tanggal</label
          >
          <div class="col-sm-8">
            <input
              type="date"
              v-model="tanggal"
              class="form-control"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
        <div>
          <div class="form-group row">
            <label
              for="exampleInput11"
              class="col-sm-5 col-form-label"
              id="label-form"
              >Pemasukan / Pengeluaran</label
            >
            <select v-model="JenisTransaksiId" @change="getKelompokMa">
              <option
                v-for="selectpp in listselectpp"
                :key="selectpp.id"
                :value="selectpp.id"
              >
                {{ selectpp.jenis }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <div class="form-group row">
            <label
              for="exampleInput11"
              class="col-sm-5 col-form-label"
              id="label-form"
              >kelompok Mata Anggaran</label
            >
            <select v-model="KelompokMAPPGTId" @change="getMataAnggaran">
              <option
                v-for="selectkma in listma"
                :key="selectkma.id"
                :value="selectkma.id"
              >
                {{ selectkma.code }} - {{ selectkma.namaKMA }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <div class="form-group row">
            <label
              for="exampleInput11"
              class="col-sm-5 col-form-label"
              id="label-form"
              >Mata Anggaran</label
            >
            <select v-model="MataAnggaranPPGTId">
              <option
                v-for="selectma in listmataanggaran"
                :key="selectma.id"
                :value="selectma.id"
              >
                {{ selectma.code }} - {{ selectma.namaMA }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label
            for="exampleInput11"
            class="col-sm-4 col-form-label"
            id="label-form"
            >Jumlah
          </label>
          <div class="col-sm-8">
            <input
              type="number"
              v-model="jumlah"
              class="form-control"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
        <div class="form-group row">
          <label
            for="exampleInput11"
            id="label-form"
            class="col-sm-4 col-form-label"
            >Keterangan</label
          >
          <div class="col-sm-8">
            <input
              id="form-keterangan"
              type="text"
              v-model="keterangan"
              class="form-control"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Tambahkan</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "../api/axios";

export default {
  name: "InputTransaksi",
  data() {
    return {
      namaTransaksi: "",
      tanggal: "",
      keterangan: "",
      JenisTransaksiId: "",
      KelompokMAPPGTId: "",
      MataAnggaranPPGTId: "",
      jumlah: 0,
      listselectpp: [],
      listma: [],
      listmataanggaran: []
    };
  },
  methods: {
    addTransaksi() {
      let payload = {
        namaTransaksi: this.namaTransaksi,
        tanggal: this.tanggal,
        keterangan: this.keterangan,
        JenisTransaksiId: +this.JenisTransaksiId,
        KelompokMAPPGTId: +this.KelompokMAPPGTId,
        MataAnggaranPPGTId: +this.MataAnggaranPPGTId,
        jumlah: +this.jumlah
      };
      // console.log(payload);
      this.$store
        .dispatch("addTransaksi", payload)
        .then(({ data }) => {
          console.log("Input sukses");
          this.$router.push("/transaksilist");
          localStorage.getItem("access_token");
        })
        .catch(err => {
          console.log(err);
        });
    },
    getKelompokMa(e) {
      let cabang = localStorage.getItem("cabang");
      // console.log(e.target.value);
      let id = e.target.value;
      return axios
        .get(`/${this.$store.state.currentCabang}/kelompokma/${id}`)
        .then(res => {
          console.log(res);
          this.listma = res.data;
        });
    },
    getListPp() {
      return axios
        .get(`/${this.$store.state.currentCabang}/jenistransaksi`)
        .then(res => {
          console.log(res);
          this.listselectpp = res.data;
        });
    },
    getMataAnggaran(e) {
      let cabang = localStorage.getItem("cabang");
      // console.log(e.target.value);
      let id = e.target.value;
      return axios
        .get(`/${this.$store.state.currentCabang}/mataanggaran/${id}`)
        .then(res => {
          this.listmataanggaran = res.data;
        });
    }
  },
  created() {
    this.getListPp();
  }
};
</script>

<style>
.layout-form {
  width: 40vw;
  /* background-color: rgb(199, 237, 237); */
}
.container-input {
  border: lawngreen;
  margin-left: 10cm;
  margin-top: 2cm;
  /* margin-top: 2cm; */
  justify-self: center;
  justify-content: center;
}

label {
  display: flex;
  justify-self: left;
  justify-content: left;
}
.form-label {
  justify-content: center;
  justify-items: center;
}
#form-input {
  color: black;
  display: inline;
  justify-content: center;
  justify-items: center;
}
</style>
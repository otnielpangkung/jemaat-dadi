<template>
  <div class="container">
    <div class="layout-form">
      <form @submit.prevent="editTransaksi">
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
          <label for="exampleInput11" class="col-sm-4 col-form-label"
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
            <label for="exampleInput11" class="col-sm-5 col-form-label"
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
            <label for="exampleInput11" class="col-sm-5 col-form-label"
              >kelompok Mata Anggaran</label
            >
            <select v-model="KelompokMAPPGTId" @change="getMataAnggaran">
              <option
                v-for="selectkma in listma"
                :key="selectkma.id"
                :value="selectkma.id"
              >
                {{ selectkma.namaKMA }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <div class="form-group row">
            <label for="exampleInput11" class="col-sm-5 col-form-label"
              >Mata Anggaran</label
            >
            <select v-model="MataAnggaranPPGTId">
              <option
                v-for="selectma in listmataanggaran"
                :key="selectma.id"
                :value="selectma.id"
              >
                {{ selectma.namaMA }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <label for="exampleInput11">Jumlah</label>
          <input
            type="number"
            v-model="jumlah"
            class="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div>
          <label for="exampleInput11">Keterangan</label>
          <input
            type="text"
            v-model="keterangan"
            class="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <button type="submit" class="btn btn-primary">Tambahkan</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "../api/axios";

export default {
  name: "EditPage",
  data() {
    return {
      id: "",
      namaTransaksi: "",
      tanggal: "",
      keterangan: "",
      JenisTransaksiId: "",
      KelompokMAPPGTId: "",
      MataAnggaranPPGTId: "",
      jumlah: "",
      listselectpp: [],
      listma: [],
      listmataanggaran: []
    };
  },
  computed: {},
  methods: {
    editTransaksi() {
      let payload = {
        id: this.$store.state.currentTransaksi.id,
        namaTransaksi: this.namaTransaksi,
        tanggal: this.tanggal,
        keterangan: this.keterangan,
        JenisTransaksiId: +this.JenisTransaksiId,
        KelompokMAPPGTId: +this.KelompokMAPPGTId,
        MataAnggaranPPGTId: +this.MataAnggaranPPGTId,
        jumlah: +this.jumlah
      };
      console.log(payload);
      this.$store
        .dispatch("editTransaksi", payload)
        .then(({ data }) => {
          this.$router.push("/transaksilist");
          localStorage.getItem("access_token");
        })
        .catch(err => {
          console.log(err);
        });
    },
    getListPp() {
      return axios
        .get(`/${this.$store.state.currentCabang}/jenistransaksi`)
        .then(res => {
          this.listselectpp = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getcurretKelompokMa(id) {
      return axios
        .get(`/${this.$store.state.currentCabang}/kelompokma/${id}`)
        .then(res => {
          // console.log(res, "<<res");
          this.listma = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCurrentMa(id) {
      // console.log(e.target.value);

      return axios
        .get(`/${this.$store.state.currentCabang}/mataanggaran/${id}`)
        .then(res => {
          this.listmataanggaran = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getKelompokMa(e) {
      console.log(e.target.value);
      let id = e.target.value;
      return axios
        .get(`/${this.$store.state.currentCabang}/kelompokma/${id}`)
        .then(res => {
          this.listma = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMataAnggaran(e) {
      console.log(e.target.value);
      let id = e.target.value;
      return axios
        .get(`/${this.$store.state.currentCabang}/mataanggaran/${id}`)
        .then(res => {
          this.listmataanggaran = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    console.log(this.$store.state.currentTransaksi);
    this.getListPp();
    this.getcurretKelompokMa(
      this.$store.state.currentTransaksi.JenisTransaksiId
    );
    this.getCurrentMa(this.$store.state.currentTransaksi.KelompokMAPPGTId);
    this.namaTransaksi = this.$store.state.currentTransaksi.namaTransaksi;
    this.tanggal = this.$store.state.currentTransaksi.tanggal;
    this.jumlah = this.$store.state.currentTransaksi.jumlah;
    this.keterangan = this.$store.state.currentTransaksi.keterangan;
    this.JenisTransaksiId = this.$store.state.currentTransaksi.JenisTransaksiId;
    this.KelompokMAPPGTId = this.$store.state.currentTransaksi.KelompokMAPPGTId;
    this.MataAnggaranPPGTId = this.$store.state.currentTransaksi.MataAnggaranPPGTId;
  }
};
</script>

<style>
</style>
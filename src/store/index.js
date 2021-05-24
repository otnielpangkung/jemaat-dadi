import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userLogin: false,
    currentCabang: localStorage.getItem("cabang"),
    transaksis: [],
    banners: [],
    transaksiMataAngagran: [],
    currentTransaksi: "",
    namaMaPemasukan: [],
    namaMaPengeluaran: [],
  },
  mutations: {
    setUserLogin(state, status) {
      state.userLogin = status
    },
    listBanner(state, data) {
      state.banners = data
    },
    listTransaksi(state, data) {
      state.transaksis = data
      // console.log(data);
    },
    listTransaksiMataanggaran(state, data) {
      state.transaksiMataAngagran = data
    },
    setCurrentTransaksi(state, transaksi) {
      state.currentTransaksi = transaksi
    },
    setNamaMaPemasukan(state, data) {
      console.log(data, "masuuuk pemasuuukan");
      state.namaMaPemasukan = data
    },
    setNamaMaPengeluaran(state, data) {
      console.log(data, "set nama pengeluaran =======");
      state.namaMaPengeluaran = data
    },
  },
  actions: {
    login(context, payload) {
      console.log(payload);
      return axios.post(`/${payload.cabang}/login`, {
        username: payload.username,
        password: payload.password
      })
    },
    addTransaksi(context, payload) {
      let cabang = localStorage.getItem("cabang")
      let data = {
        namaTransaksi: payload.namaTransaksi,
        tanggal: payload.tanggal,
        keterangan: payload.keterangan,
        JenisTransaksiId: payload.JenisTransaksiId,
        KelompokMAPPGTId: payload.KelompokMAPPGTId,
        MataAnggaranPPGTId: payload.MataAnggaranPPGTId,
        jumlah: payload.jumlah
      }
      // console.log(localStorage.getItem("access_token"));
      return axios({
        method: "post",
        url: `/${cabang}/transaksi`,
        headers: { access_token: localStorage.getItem("access_token") },
        data
      })
    },
    fatchTransaksi(context, payload) {
      let cabang = localStorage.getItem("cabang")
      return axios.get(`/${cabang}/transaksi`, {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          console.log(data, "masuuuk");
          context.commit("listTransaksi", data)
        })
        .catch(err => {
          console.log(err);
        })
    },
    fatchBanner(context, payload) {
      return axios.get("/banner")
        .then(({ data }) => {
          console.log(data, ">>> data banner");
          context.commit("listBanners", data)
        })
        .catch(err => {
          console.log(err);
        })
    },
    fatchNamaMaPemasukan(context, payload) {
      let cabang = localStorage.getItem("cabang")
      // console.log(cabang, "=======");
      return axios.get(`/${cabang}/nama/mataanggaran/pemasukan`)
        .then(({ data }) => {
          context.commit("setNamaMaPemasukan", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fatchNamaMaPengeluaran(context, payload) {
      let cabang = localStorage.getItem("cabang")
      return axios.get(`/${cabang}/nama/mataanggaran/pengeluaran`)
        .then(({ data }) => {
          console.log(data);
          context.commit("setNamaMaPengeluaran", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    editTransaksi(context, payload) {
      let cabang = localStorage.getItem("cabang")
      return axios.put(`/${cabang}/transaksi/${payload.id}`, payload, {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
    },
    deleteTransaksi(context, id) {
      let cabang = localStorage.getItem("cabang")
      console.log(id);
      return axios.delete(`/${cabang}/transaksi/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(data => {
          console.log("masuuk delete");
          localStorage.getItem("access_token");
          this.$store.dispatch("fatchTransaksi");
        })
        .catch(err => {
          console.log(err);
        });
    },
    editStatus(context, id) {
      let cabang = localStorage.getItem("cabang")
      return axios.patch(`/${cabang}/transaksi/status/${id}`, {
        satus: "open"
      }, {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
    }
  },
  modules: {
  }
})

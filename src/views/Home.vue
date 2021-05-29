<template>
  <div class="col">
    <div class="row align-items-center mt-5">
      <div class="col">
        <img
          src="../assets/statistic_data.png"
          width="650"
          height="500"
          class="d-inline-block align-top"
        />
      </div>

      <div class="col">
        <div id="right-text">
          <h1 class="text-left">Syalom,</h1>
          <div id="info-saldo" class="text-left">
            Saldo Kas {{ this.$store.state.currentCabang.toUpperCase() }} Saat
            ini adalah : Rp.
            {{ formatUang(saldoKas) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Banner from "../components/Banner";
import axios from "../api/axios";
export default {
  name: "Home",

  data() {
    return {
      saldoKas: 0
    };
  },
  components: {
    HelloWorld,
    Banner
  },
  methods: {
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
    currentSaldoKas() {
      console.log("okokokoko");
      return axios
        .get(`/${this.$store.state.currentCabang}/saldokas`)
        .then(({ data }) => {
          console.log(data);
          let saldo = 0;
          data.forEach(el => {
            saldo += el.saldo;
            return saldo;
          });
          console.log(saldo, "sallldooo");
          this.saldoKas = saldo;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.currentSaldoKas();
  }
};
</script>
<style scoped>
.logoHome {
  columns: 10cm;
  display: initial;
}
#info-saldo {
  display: flex;
  justify-content: left;
  font-size: 25px;
}
#right-text {
  /* display: flex; */
  font-size: 10px;
}
</style>
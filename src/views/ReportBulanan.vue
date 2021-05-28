<template>
  <div class="col" id="report-bulanan">
    <div class="container mb-3" id="form-tanggal">
      <h4>PERIODE :</h4>
      <vue-monthly-picker v-model="selectedMonth"></vue-monthly-picker>
      <button
        @click.prevent="downloadReport2()"
        type="button"
        class="btn btn-light"
      >
        Download Report
      </button>
    </div>
    <!-- <div class="col mt-4" id="judul laporan">
      <h1>LAPORAN KEUANGAN PPGT JEMAAT DADI</h1>
      <h3>PERIODE:</h3>
    </div> -->

    <div class="col">
      <table class="table table-striped" id="table-test">
        <thead class="justify-content-center">
          <tr>
            <th Colspan="4">LAPORAN KEUANGAN JEMAAT</th>
          </tr>
          <tr>
            <th Colspan="4">PERIODE {{ periode() }}</th>
          </tr>
          <tr>
            <th Colspan="4"></th>
          </tr>
          <tr></tr>
          <tr>
            <th scope="col" id="namaMa">Nama Mata Anggaran</th>
            <th scope="col" id="kode">Kode</th>
            <th scope="col" id="rupiah"></th>
            <th scope="col">Jumlah</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td id="keterangan-table1">
              1. Saldo Kas Awal
            </td>
            <td></td>
            <td>Rp.</td>
            <td class="text-right">
              {{ formatUang(getSaldoAwal()) }}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td id="keterangan-table1">
              2. Penerimaan
            </td>
            <td></td>
            <td>Rp.</td>
            <td class="text-right">
              {{ formatUang(getTotalPemasukan(listTransaksi)) }}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td id="keterangan-table1">
              3. Jumlah (1 + 2)
            </td>
            <td></td>
            <td>Rp.</td>
            <td class="text-right">
              {{
                formatUang(
                  `${getSaldoAwal() + getTotalPemasukan(listTransaksi)}`
                )
              }}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td id="keterangan-table1">
              4. Pengeluaran
            </td>
            <td></td>
            <td>Rp.</td>
            <td class="text-right">
              {{ formatUang(getTotalPengeluaran(listTransaksi)) }}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td id="keterangan-table1">
              5. Saldo Akhir
            </td>
            <td></td>
            <td>Rp.</td>
            <td class="text-right">
              {{
                formatUang(
                  `${getSaldoAwal() +
                    getTotalPemasukan(listTransaksi) -
                    getTotalPengeluaran(listTransaksi)}`
                )
              }}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th id="title-pemasukan">
              Pemasukan
            </th>
          </tr>

          <tr v-for="namaPemasukan in listMaPemasukan" :key="namaPemasukan.id">
            <td scope="row" id="data-keterangan">
              {{ namaPemasukan.namaMA }}
            </td>
            <td>{{ namaPemasukan.code }}</td>
            <td>Rp.</td>
            <td class="text-right">
              {{
                formatUang(getJumlah(namaPemasukan[`Transaksi${namaCabang}s`]))
              }}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th id="title-pemasukan">
              Pengeluaran
            </th>
          </tr>

          <tr
            v-for="namaPengeluaran in listMaPengeluaran"
            :key="namaPengeluaran.id"
          >
            <td scope="row" id="data-keterangan">
              {{ namaPengeluaran.namaMA }}
            </td>
            <td>{{ namaPengeluaran.code }}</td>
            <td>Rp.</td>
            <td class="text-right">
              {{
                formatUang(
                  getJumlah(namaPengeluaran[`Transaksi${namaCabang}s`])
                )
              }}
            </td>
          </tr>
          <tr>
            <th Colspan="4"></th>
          </tr>
          <tr>
            <td Colspan="1">Ketua</td>
            <td Colspan="3">Bendahara</td>
          </tr>
          <tr>
            <td Colspan="1" id="tanda-tangan"></td>
            <td Colspan="3" id="tanda-tangan"></td>
          </tr>
          <tr>
            <th Colspan="4"></th>
          </tr>
          <tr>
            <td Colspan="1">(.........................)</td>
            <td Colspan="3">(.........................)</td>
          </tr>
          <tr>
            <th Colspan="4"></th>
          </tr>
          <tr>
            <th Colspan="3">Catatan :</th>
            <th Colspan="1">Verifikasi</th>
          </tr>
          <tr>
            <td Colspan="1" id="tanda-tangan"></td>
            <td Colspan="3" id="tanda-tangan"></td>
          </tr>
          <tr>
            <th Colspan="4"></th>
          </tr>
          <tr>
            <td Colspan="1">(.........................)</td>
            <td Colspan="3"></td>
          </tr>
        </tbody>
      </table>
      <div class="spasi"></div>
    </div>
  </div>
</template>

<script>
import axios from "../api/axios.js";
import moment from "moment";
import VueMonthlyPicker from "vue-monthly-picker";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "ReportBulanan",
  data() {
    return {
      selectedMonth: "",
      saldokas: []
    };
  },
  components: { VueMonthlyPicker },
  methods: {
    reportPemasukan() {
      console.log("report pemasukan");
      let result = [];
      this.listMaPemasukan.map((item, index) => {
        console.log(item, "iteeeem");
        result.push({
          No: (index + 1).toString(),
          Keterangan: item.namaMA,
          code: item.code,
          Jumlah: this.formatUang(
            this.getJumlah(item.TransaksiSMGTs).toString()
          )
        });
      });
      return result;
    },
    reportPengeluaran() {
      console.log("report pengeluaran");
      let result = [];
      this.listMaPengeluaran.map((item, index) => {
        console.log(item, "iteeeem");
        result.push({
          No: (index + 1).toString(),
          Keterangan: item.namaMA,
          code: item.code,
          Jumlah: this.formatUang(
            this.getJumlah(item.TransaksiSMGTs).toString()
          )
        });
      });
      return result;
    },
    downloadReport() {
      let allTransaksi = this.$store.state.transaksis;
      const periode = moment(this.selectedMonth).format("MM-YYYY");
      let saldoAwalHeaders = [];
      let headers1 = [
        {
          id: "No",
          name: "No",
          prompt: "No",
          width: 20,
          align: "left",
          padding: 0
        },
        {
          id: "Keterangan",
          name: "Keterangan",
          prompt: "Keterangan",
          width: 165,
          align: "left",
          padding: 0
        },
        {
          id: "Jumlah",
          name: "Jumlah",
          prompt: "Jumlah",
          width: 50,
          align: "right",
          padding: 0
        }
      ];
      let data = [
        {
          No: "1",
          Keterangan: "Saldo Kas Awal",
          Jumlah: this.formatUang(this.getSaldoAwal().toString())
        },
        {
          No: "2",
          Keterangan: "Total Penerimaan",
          Jumlah: this.formatUang(this.getTotalPemasukan(allTransaksi))
        },
        {
          No: "3",
          Keterangan: "Jumlah (1 + 2)",
          Jumlah: this.formatUang(
            `${this.getSaldoAwal() + this.getTotalPemasukan(allTransaksi)}`
          )
        },
        {
          No: "4",
          Keterangan: "Total Pengeluaran",
          Jumlah: this.formatUang(this.getTotalPengeluaran(allTransaksi))
        },
        {
          No: "5",
          Keterangan: "Saldo Akhir",
          Jumlah: this.formatUang(
            `${this.getSaldoAwal() +
              this.getTotalPemasukan(allTransaksi) -
              this.getTotalPengeluaran(allTransaksi)}`
          )
        }
      ];
      let headers2 = [
        {
          id: "No",
          name: "No",
          prompt: "No",
          width: 17,
          align: "left",
          padding: 0
        },
        {
          id: "Keterangan",
          name: "Keterangan",
          prompt: "Keterangan",
          width: 170,
          align: "left",
          padding: 0
        },
        {
          id: "code",
          name: "code",
          prompt: "code",
          width: 28,
          align: "left",
          padding: 0
        },
        {
          id: "Jumlah",
          name: "Jumlah",
          prompt: "Jumlah",
          width: 45,
          align: "right",
          padding: 0
        }
      ];
      var margin = { top: 5, right: 5, bottom: 10, left: 5 };

      const doc = new jsPDF();
      doc.text("LAPORAN KEUANGAN", 75, 10);
      doc.text(`PENGURUS PPGT JEMAAT DADI ${periode}`, 50, 20);
      doc.table(
        10,
        30,
        data,
        headers1,
        {
          margins: "5, 5, 10, 10"
          // peding: 50
        },
        { styles: { fillColor: [255, 0, 0] } }
      );
      doc.text("PEMASUKAN", 10, 105);
      doc.table(5, 110, this.reportPemasukan(), headers2);
      doc.text("PENGELUARAN", 10, 210);
      doc.table(5, 215, this.reportPengeluaran(), headers2);
      // doc.table({
      //   columnStyles: { europe: { halign: "center" } }, // European countries centered
      //   body: [
      //     { europe: "Sweden", america: "Canada", asia: "China" },
      //     { europe: "Norway", america: "Mexico", asia: "Japan" }
      //   ],
      //   columns: [
      //     { header: "Europe", dataKey: "europe" },
      //     { header: "Asia", dataKey: "asia" }
      //   ]
      // });
      doc.save(`laporan-keuangan.pdf`);
    },

    downloadReport2() {
      // console.log("download 2");
      const doc = new jsPDF();
      doc.autoTable({
        html: "#table-test",
        // styles: { fillColor: [255, 0, 0] },
        columnStyles: { 3: { halign: "right" } }
      });

      doc.save(`Lap.Keu ${this.namaCabang} ${this.periodeLaporan}.pdf`);
    },
    periode() {
      const bulan = moment(this.selectedMonth).get("month") + 1;
      const tahun = moment(this.selectedMonth).get("year");

      return `Bulan ${bulan} Tahun ${tahun}`;
    },
    formatUang(data) {
      // console.log(data, "dataa");
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
    getSaldoAwal() {
      const bulan = moment(this.selectedMonth).get("month") + 1;
      const tahun = moment(this.selectedMonth).get("year");
      let saldoAwal = 0;
      this.saldokas.map(item => {
        // console.log(tahun, item.tahun, "taaaahun");
        if (tahun == item.tahun && item.bulan < bulan) {
          saldoAwal += item.saldo;
        } else if (item.tahun < tahun) {
          saldoAwal += item.saldo;
        }
      });
      return saldoAwal;
    },
    getTotalPemasukan(data) {
      let jumlah = 0;
      data.map(item => {
        const tanggal = moment(item.tanggal).format("MM-YYYY");
        const periode = moment(this.selectedMonth).format("MM-YYYY");
        if (periode == tanggal && +item.JenisTransaksiId % 2 == 1) {
          jumlah += item.jumlah;
        }
      });
      return jumlah;
    },
    getTotalPengeluaran(data) {
      let jumlah = 0;
      data?.map(item => {
        const tanggal = moment(item.tanggal).format("MM-YYYY");
        const periode = moment(this.selectedMonth).format("MM-YYYY");
        if (periode == tanggal && +item.JenisTransaksiId % 2 == 0) {
          jumlah += item.jumlah;
        }
      });
      return jumlah;
    },
    getJumlah(data) {
      let jumlah = 0;
      console.log(data, "dataaa------");
      data?.map(item => {
        const tanggal = moment(item.tanggal).format("MM-YYYY");
        const periode = moment(this.selectedMonth).format("MM-YYYY");
        if (periode == tanggal) {
          jumlah += item.jumlah;
        }
      });
      return jumlah;
    },
    fetchSaldoKas() {
      return axios
        .get(`${this.$store.state.currentCabang}/saldokas`)
        .then(data => {
          this.saldokas = data.data;
          console.log(data.data, "dataaaa");
        })
        .catch(err => {
          console.log(err, "errrr");
        });
    }
  },
  computed: {
    periodeLaporan() {
      const bulan = moment(this.selectedMonth).get("month") + 1;
      const tahun = moment(this.selectedMonth).get("year");
      return `PERIODE BULAN ${bulan} TAHUN ${tahun}`;
    },
    namaCabang() {
      return localStorage.getItem("cabang").toUpperCase();
    },
    listTransaksi() {
      // console.log(this.$store.state.transaksis, "masuuuk list tranmsaksi");
      return this.$store.state.transaksis;
    },
    listMaPemasukan() {
      // console.log(this.$store.state.namaMaPemasukan, "masuk list pengeluaran");
      return this.$store.state.namaMaPemasukan;
    },
    listMaPengeluaran() {
      console.log(
        this.$store.state.namaMaPengeluaran,
        "masuk list pengeluaran lkwerlkewlkl"
      );
      return this.$store.state.namaMaPengeluaran;
    }
  },
  beforeCreate() {},
  created() {
    this.fetchSaldoKas();
    this.$store.dispatch("fatchTransaksi");
    this.$store.dispatch("fatchNamaMaPemasukan");
    this.$store.dispatch("fatchNamaMaPengeluaran");
  }
};
</script>

<style scoped>
#form-tanggal {
  display: flex;
}
h4 {
  color: black;
}
#table-test {
  margin-left: 0cm;
}
#keterangan-table1 {
  display: flex;
  justify-content: left;
  font-weight: bold;
}
#rupiah {
  width: 5mm;
}
#kode {
  width: 15mm;
}
#namaMa {
  width: 25cm;
}
#title-pemasukan {
  display: flex;
  font-weight: bold;
  font-size: 6mm;
}
#data-keterangan {
  display: flex;
}

#report-bulanan {
  justify-items: center;
  justify-self: center;
  align-items: center;
  max-width: 35cm;
}
#format-uang {
  justify-content: right;
  justify-items: right;
}
.spasi {
  margin-top: 15mm;
}
</style>
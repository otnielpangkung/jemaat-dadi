<template>
  <div class="container row">
    <div>
      Tahun
      <input v-model="tahun" />
      <button
        @click.prevent="downloadReport()"
        type="button"
        class="btn btn-light"
      >
        Download Report
      </button>
    </div>
    <table class="table table-striped" id="table">
      <thead>
        <tr>
          <th Colspan="6">LAPORAN KEUANGAN JEMAAT</th>
        </tr>
        <tr>
          <th Colspan="6">PERIODE TAHUN {{ this.tahun }}</th>
        </tr>
        <tr>
          <th Colspan="6"></th>
        </tr>
        <tr>
          <th scope="col">NO</th>
          <th scope="col">Uraian</th>
          <th scope="col" id="colomn-uang">Saldo Awal</th>
          <th scope="col" id="colomn-uang">Penerimaan Persembahaan</th>
          <th scope="col" id="colomn-uang">Belanja</th>
          <th scope="col" id="colomn-uang">Saldo Akhir</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">A</th>
          <td class="text-left">Kas Bendahara Jemaat</td>
          <td class="text-right">{{ formatUang(saldoAwalJemaat()) }}</td>
          <td class="text-right">{{ formatUang(pemasukanJemaat()) }}</td>
          <td class="text-right">{{ formatUang(pengeluaranJemaat()) }}</td>
          <td class="text-right">
            {{
              formatUang(
                `${saldoAwalJemaat() + pemasukanJemaat() - pengeluaranJemaat()}`
              )
            }}
          </td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td>Dikurangi : Dana Transito</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td class="text-left">Pundi II belum Disetor</td>
          <td class="text-right">{{ formatUang(saldoAwalPundiII()) }}</td>
          <td class="text-right">{{ formatUang(penerimaanPundiII()) }}</td>
          <td class="text-right">{{ formatUang(pengeluaranPundiII()) }}</td>
          <td class="text-right">
            {{
              formatUang(
                `${saldoAwalPundiII() +
                  penerimaanPundiII() -
                  pengeluaranPundiII()}`
              )
            }}
          </td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td class="text-left">Aksi Panggiu belum disetor</td>
          <td class="text-right">{{ formatUang(saldoAwalPangiu()) }}</td>
          <td class="text-right">{{ formatUang(penerimaanPangiu()) }}</td>
          <td class="text-right">{{ formatUang(pengeluaranPangiu()) }}</td>
          <td class="text-right">
            {{
              formatUang(
                `${saldoAwalPangiu() +
                  penerimaanPangiu() -
                  pengeluaranPangiu()}`
              )
            }}
          </td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td class="text-left">Dana Transito Lainnya</td>
          <td class="text-right">{{ formatUang(saldoAwalTransitLain()) }}</td>
          <td class="text-right">{{ formatUang(penerimaanTransitLain()) }}</td>
          <td class="text-right">{{ formatUang(pengeluaranTransitLain()) }}</td>
          <td class="text-right">
            {{
              formatUang(
                `${saldoAwalTransitLain() +
                  penerimaanTransitLain() -
                  pengeluaranTransitLain()}`
              )
            }}
          </td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td>Jumlah Kas Bendahara</td>
          <td class="text-right">
            {{
              formatUang(
                `${saldoAwalJemaat() -
                  saldoAwalPundiII() -
                  saldoAwalPangiu() -
                  saldoAwalTransitLain()}`
              )
            }}
          </td>
          <td class="text-right">
            {{
              formatUang(
                `${pemasukanJemaat() -
                  penerimaanPundiII() -
                  penerimaanPangiu() -
                  penerimaanTransitLain()}`
              )
            }}
          </td>
          <td class="text-right">
            {{
              formatUang(
                `${pengeluaranJemaat() -
                  pengeluaranPundiII() -
                  pengeluaranPangiu() -
                  pengeluaranTransitLain()}`
              )
            }}
          </td>
          <td class="text-right">
            {{
              formatUang(
                `${saldoAwalJemaat() -
                  saldoAwalPundiII() -
                  saldoAwalPangiu() -
                  saldoAwalTransitLain() +
                  (pemasukanJemaat() -
                    penerimaanPundiII() -
                    penerimaanPangiu() -
                    penerimaanTransitLain()) -
                  (pengeluaranJemaat() -
                    pengeluaranPundiII() -
                    pengeluaranPangiu() -
                    pengeluaranTransitLain())}`
              )
            }}
          </td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row">B</th>
          <td class="text-left">Kas Panitia Pembangunan</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row">C</th>
          <td class="text-left">Kas Kelompok Pelayanan</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <th scope="row">D</th>
          <td>Bendahara OIG</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row">D.1</th>
          <td class="text-left">Kas SMGT</td>
          <td class="text-right">{{ formatUang(saldoAwalSMGT()) }}</td>
          <td class="text-right">{{ formatUang(pemasukanSMGT()) }}</td>
          <td class="text-right">{{ formatUang(pengeluaranSMGT()) }}</td>
          <td class="text-right">
            {{
              formatUang(
                `${saldoAwalSMGT() + pemasukanSMGT() - pengeluaranSMGT()}`
              )
            }}
          </td>
        </tr>
        <tr>
          <th scope="row">D.2</th>
          <td class="text-left">Kas PPGT</td>
          <td class="text-right">{{ formatUang(saldoAwalPPGT()) }}</td>
          <td class="text-right">{{ formatUang(pemasukanPPGT()) }}</td>
          <td class="text-right">{{ formatUang(pengeluaranPPGT()) }}</td>
          <td class="text-right">
            {{
              formatUang(
                `${saldoAwalPPGT() + pemasukanPPGT() - pengeluaranPPGT()}`
              )
            }}
          </td>
        </tr>
        <tr>
          <th scope="row">D.3</th>
          <td class="text-left">Kas PWGT</td>
          <td class="text-right">{{ formatUang(saldoAwalPWGT()) }}</td>
          <td class="text-right">{{ formatUang(pemasukanPWGT()) }}</td>
          <td class="text-right">{{ formatUang(pengeluaranPWGT()) }}</td>
          <td class="text-right">
            {{
              formatUang(
                `${saldoAwalPWGT() + pemasukanPWGT() - pengeluaranPWGT()}`
              )
            }}
          </td>
        </tr>
        <tr>
          <th scope="row">D.4</th>
          <td class="text-left">Kas PKBGT</td>
          <td class="text-right">{{ formatUang(saldoAwalPKBGT()) }}</td>

          <td class="text-right">{{ formatUang(pemasukanPKBGT()) }}</td>
          <td class="text-right">{{ formatUang(pengeluaranPKBGT()) }}</td>
          <td class="text-right">
            {{
              formatUang(
                `${saldoAwalPKBGT() + pemasukanPKBGT() - pengeluaranPKBGT()}`
              )
            }}
          </td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td>TOTAL KAS JEMAAT</td>
          <td class="text-right">
            {{
              formatUang(
                `${saldoAwalJemaat() -
                  saldoAwalPundiII() -
                  saldoAwalPangiu() -
                  saldoAwalTransitLain() +
                  saldoAwalSMGT() +
                  saldoAwalPPGT() +
                  saldoAwalPWGT() +
                  saldoAwalPKBGT()}`
              )
            }}
          </td>
          <td class="text-right">
            {{
              formatUang(
                `${pemasukanJemaat() -
                  penerimaanPundiII() -
                  penerimaanPangiu() -
                  penerimaanTransitLain() +
                  pemasukanSMGT() +
                  pemasukanPPGT() +
                  pemasukanPWGT() +
                  pemasukanPKBGT()}`
              )
            }}
          </td>
          <td class="text-right">
            {{
              formatUang(
                `${pengeluaranJemaat() -
                  pengeluaranPundiII() -
                  pengeluaranPangiu() -
                  pengeluaranTransitLain() +
                  pengeluaranSMGT() +
                  pengeluaranPPGT() +
                  pengeluaranPWGT() +
                  pengeluaranPKBGT()}`
              )
            }}
          </td>
          <td class="text-right">
            {{
              formatUang(
                `${saldoAwalJemaat() -
                  saldoAwalPundiII() -
                  saldoAwalPangiu() -
                  saldoAwalTransitLain() +
                  (pemasukanJemaat() -
                    penerimaanPundiII() -
                    penerimaanPangiu() -
                    penerimaanTransitLain()) -
                  (pengeluaranJemaat() -
                    pengeluaranPundiII() -
                    pengeluaranPangiu() -
                    pengeluaranTransitLain()) +
                  (saldoAwalSMGT() + pemasukanSMGT() - pengeluaranSMGT()) +
                  (saldoAwalPPGT() + pemasukanPPGT() - pengeluaranPPGT()) +
                  (saldoAwalPKBGT() + pemasukanPKBGT() - pengeluaranPKBGT()) +
                  (saldoAwalPWGT() + pemasukanPWGT() - pengeluaranPWGT())}`
              )
            }}
          </td>
        </tr>
        <tr>
          <th Colspan="6"></th>
        </tr>
        <tr>
          <th Colspan="3">Ketua PMG</th>
          <th Colspan="3">Bendahara</th>
        </tr>
        <tr>
          <td Colspan="3"></td>
          <td Colspan="3"></td>
        </tr>
        <tr>
          <td Colspan="3"></td>
          <td Colspan="3"></td>
        </tr>
        <tr>
          <td Colspan="3">(.........................)</td>
          <td Colspan="3">(.........................)</td>
        </tr>
        <tr>
          <th Colspan="6"></th>
        </tr>
        <tr>
          <th Colspan="3">Catatan :</th>
          <th Colspan="3">Verifikasi</th>
        </tr>
        <tr>
          <td Colspan="3"></td>
          <td Colspan="3"></td>
        </tr>
        <tr>
          <td Colspan="3"></td>
          <td Colspan="3"></td>
        </tr>
        <tr>
          <td Colspan="3"></td>
          <td Colspan="3">(.........................)</td>
        </tr>
      </tbody>
    </table>
    <div id="spasi"></div>
  </div>
</template>

<script>
import axios from "../api/axios.js";
import moment from "moment";
import jsPDF from "jspdf";
export default {
  name: "LapKeuJemaat",
  data() {
    return {
      tahun: 2021,
      saldoKas: [],
      saldoKasPPGT: [],
      saldoKasPWGT: [],
      saldoKasPKGT: [],
      saldoKasSMGT: []
    };
  },
  methods: {
    downloadReport() {
      // console.log("download 2");
      const doc = new jsPDF();
      doc.autoTable({
        html: "#table",
        // styles: { fillColor: [255, 0, 0] },
        columnStyles: {
          2: { halign: "right" },
          3: { halign: "right" },
          4: { halign: "right" },
          5: { halign: "right" }
        }
      });

      doc.save(`Lap.Keu Jemaat ${this.tahun}.pdf`);
    },
    saldoAwalPundiII() {
      let masuk = 0;
      let keluar = 0;
      let saldoAwal = 0;
      this.$store.state.transaksisJemaat?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);
        if (
          +item.tanggal.slice(0, 4) < +this.tahun &&
          item.MataAnggaranJEMAATId == 41
        ) {
          masuk += item.jumlah;
        } else if (
          item.tanggal.slice(0, 4) < this.tahun &&
          item.MataAnggaranJEMAATId == 291
        ) {
          keluar += item.jumlah;
        }
        saldoAwal = masuk - keluar;
      });
      return saldoAwal;
    },
    penerimaanPundiII() {
      let saldo = 0;
      this.$store.state.transaksisJemaat?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);
        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.MataAnggaranJEMAATId == 41
        ) {
          saldo += item.jumlah;
        }
      });
      return saldo;
    },
    pengeluaranPundiII() {
      let saldo = 0;
      this.$store.state.transaksisJemaat?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);
        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.MataAnggaranJEMAATId == 291
        ) {
          saldo += item.jumlah;
        }
      });
      return saldo;
    },
    saldoAwalPangiu() {
      let masuk = 0;
      let keluar = 0;
      let saldoAwal = 0;
      this.$store.state.transaksisJemaat?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);
        if (
          item.tanggal.slice(0, 4) < this.tahun &&
          item.MataAnggaranJEMAATId == 42
        ) {
          masuk += item.jumlah;
        } else if (
          item.tanggal.slice(0, 4) < this.tahun &&
          item.MataAnggaranJEMAATId == 292
        ) {
          keluar += item.jumlah;
        }
        saldoAwal = masuk - keluar;
      });
      return saldoAwal;
    },
    penerimaanPangiu() {
      let saldo = 0;
      this.$store.state.transaksisJemaat?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);
        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.MataAnggaranJEMAATId == 42
        ) {
          saldo += item.jumlah;
        }
      });
      return saldo;
    },
    pengeluaranPangiu() {
      let saldo = 0;
      this.$store.state.transaksisJemaat?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);
        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.MataAnggaranJEMAATId == 292
        ) {
          saldo += item.jumlah;
        }
      });
      return saldo;
    },
    saldoAwalTransitLain() {
      let masuk = 0;
      let keluar = 0;
      let saldoAwal = 0;
      this.$store.state.transaksisJemaat?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);
        if (
          item.tanggal.slice(0, 4) < this.tahun &&
          item.MataAnggaranJEMAATId == 44
        ) {
          masuk += item.jumlah;
        } else if (
          item.tanggal.slice(0, 4) < this.tahun &&
          item.MataAnggaranJEMAATId == 294
        ) {
          keluar += item.jumlah;
        }
        saldoAwal = masuk - keluar;
      });
      return saldoAwal;
    },
    penerimaanTransitLain() {
      let saldo = 0;
      this.$store.state.transaksisJemaat?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);
        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.MataAnggaranJEMAATId == 44
        ) {
          saldo += item.jumlah;
        }
      });
      return saldo;
    },
    pengeluaranTransitLain() {
      let saldo = 0;
      this.$store.state.transaksisJemaat?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);
        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.MataAnggaranJEMAATId == 294
        ) {
          saldo += item.jumlah;
        }
      });
      return saldo;
    },
    pemasukanJemaat() {
      let total = 0;
      this.$store.state.transaksisJemaat?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);

        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.JenisTransaksiId % 2 == 1
        ) {
          total += item.jumlah;
        }
      });
      return total;
    },
    pengeluaranJemaat() {
      let total = 0;
      this.$store.state.transaksisJemaat?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);

        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.JenisTransaksiId % 2 == 0
        ) {
          total += item.jumlah;
        }
      });
      return total;
    },
    pemasukanPPGT() {
      let total = 0;
      this.$store.state.transaksisPPGT?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);

        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.JenisTransaksiId % 2 == 1
        ) {
          total += item.jumlah;
        }
      });
      return total;
    },
    pengeluaranPPGT() {
      let total = 0;
      this.$store.state.transaksisPPGT?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);

        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.JenisTransaksiId % 2 == 0
        ) {
          total += item.jumlah;
        }
      });
      return total;
    },
    pemasukanPWGT() {
      let total = 0;
      this.$store.state.transaksisPWGT?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);

        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.JenisTransaksiId % 2 == 1
        ) {
          total += item.jumlah;
        }
      });
      return total;
    },
    pengeluaranPWGT() {
      let total = 0;
      this.$store.state.transaksisPWGT?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);
        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.JenisTransaksiId % 2 == 0
        ) {
          total += item.jumlah;
        }
      });
      return total;
    },
    pemasukanPKBGT() {
      let total = 0;
      this.$store.state.transaksisPKBGT?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);

        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.JenisTransaksiId % 2 == 1
        ) {
          total += item.jumlah;
        }
      });
      return total;
    },
    pengeluaranPKBGT() {
      let total = 0;
      this.$store.state.transaksisPKBGT?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);

        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.JenisTransaksiId % 2 == 0
        ) {
          total += item.jumlah;
        }
      });
      return total;
    },
    pemasukanSMGT() {
      let total = 0;
      this.$store.state.transaksisSMGT?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);

        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.JenisTransaksiId % 2 == 1
        ) {
          total += item.jumlah;
        }
      });
      return total;
    },
    pengeluaranSMGT() {
      let total = 0;
      this.$store.state.transaksisSMGT?.map(item => {
        let setTahun = item.tanggal.slice(0, 4);

        if (
          item.tanggal.slice(0, 4) == this.tahun &&
          item.JenisTransaksiId % 2 == 0
        ) {
          total += item.jumlah;
        }
      });
      return total;
    },

    saldoAwalJemaat() {
      let tahun = this.tahun;
      let saldoAwal = 0;
      this.saldoKas?.map(data => {
        if (tahun > data.tahun) {
          saldoAwal += data.saldo;
        }
      });
      return saldoAwal;
    },
    saldoAwalPPGT() {
      let tahun = this.tahun;
      let saldoAwal = 0;
      this.saldoKasPPGT?.map(data => {
        if (tahun > data.tahun) {
          saldoAwal += data.saldo;
        }
      });
      return saldoAwal;
    },
    saldoAwalSMGT() {
      let tahun = this.tahun;
      let saldoAwal = 0;
      this.saldoKasSMGT?.map(data => {
        if (tahun > data.tahun) {
          saldoAwal += data.saldo;
        }
      });
      return saldoAwal;
    },
    saldoAwalPWGT() {
      let tahun = this.tahun;
      let saldoAwal = 0;
      this.saldoKasPWGT?.map(data => {
        if (tahun > data.tahun) {
          saldoAwal += data.saldo;
        }
      });
      return saldoAwal;
    },
    saldoAwalPKBGT() {
      let tahun = this.tahun;
      let saldoAwal = 0;
      this.saldoKasPKBGT?.map(data => {
        if (tahun > data.tahun) {
          saldoAwal += data.saldo;
        }
      });
      return saldoAwal;
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
    fetchSaldoKasJemaat() {
      return axios
        .get(`jemaat/saldokas`)
        .then(data => {
          this.saldoKas = data.data;
        })
        .catch(err => {
          console.log(err, "errrr");
        });
    },
    fetchSaldoKasPPGT() {
      return axios
        .get(`ppgt/saldokas`)
        .then(data => {
          this.saldoKasPPGT = data.data;
        })
        .catch(err => {
          console.log(err, "errrr");
        });
    },
    fetchSaldoKasPKBGT() {
      return axios
        .get(`pkbgt/saldokas`)
        .then(data => {
          this.saldoKasPKBGT = data.data;
        })
        .catch(err => {
          console.log(err, "errrr");
        });
    },
    fetchSaldoKasPWGT() {
      return axios
        .get(`pwgt/saldokas`)
        .then(data => {
          this.saldoKasPWGT = data.data;
        })
        .catch(err => {
          console.log(err, "errrr");
        });
    },
    fetchSaldoKasSMGT() {
      return axios
        .get(`smgt/saldokas`)
        .then(data => {
          this.saldoKasSMGT = data.data;
          console.log(data.data, "dataaaa");
        })
        .catch(err => {
          console.log(err, "errrr");
        });
    }
  },
  computed: {
    transaksiJemaat() {
      return this.$store.state.transaksisJemaat;
    },
    transaksiPPGT() {
      return this.$store.state.transaksisPPGT;
    },
    transaksiPKBGT() {
      return this.$store.state.transaksisPKBGT;
    },
    transaksiPWGT() {
      return this.$store.state.transaksisPWGT;
    },
    transaksiSMGT() {
      return this.$store.state.transaksisSMGT;
    }
  },
  created() {
    this.fetchSaldoKasJemaat();
    this.fetchSaldoKasPPGT();
    this.fetchSaldoKasSMGT();
    this.fetchSaldoKasPWGT();
    this.fetchSaldoKasPKBGT();
    this.$store.dispatch("fatchTransaksiPWGT");
    this.$store.dispatch("fatchTransaksiPKBGT");
    this.$store.dispatch("fatchTransaksiPPGT");
    this.$store.dispatch("fatchTransaksiJemaat");
    this.$store.dispatch("fatchTransaksiSMGT");
  }
};
</script>

<style>
.table {
  justify-content: center;
  margin-top: 5mm;
  margin-left: 5mm;
}
#colomn-uang {
  width: 5cm;
}
#spasi {
  margin-top: 15mm;
}
#tanda-tangan {
  height: 3cm;
}
</style>
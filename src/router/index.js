import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import InputTransaksi from '../views/InputTransaksi.vue'

import AllTransaksi from '../views/AllTransaksi.vue'
import TanggalLaporanBulanan from "../views/TanggalLaporanBulanan.vue"
import FindTransaksi from "../views/FindTransaksi.vue"
import EditPage from "../components/EditPage.vue"
import ReportBulanan from "../views/ReportBulanan.vue"
import ReportTahunan from "../views/ReportTahunan.vue"
import LapKeuJemaat from "../views/LapKeuJemaat.vue"


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/input',
    name: 'InputTransaksi',
    component: InputTransaksi,
    meta: { requiresAuth: true }
  },

  {
    path: '/report/bydate',
    name: 'TanggalLaporanBulanan',
    component: TanggalLaporanBulanan,
    meta: { requiresAuth: true }
  },
  {
    path: '/report/bulanan',
    name: 'ReportBulanan',
    component: ReportBulanan,
    meta: { requiresAuth: true }
  },
  {
    path: '/report/tahunan',
    name: 'ReportTahunan',
    component: ReportTahunan,
    meta: { requiresAuth: true }
  },
  {
    path: '/transaksilist',
    name: 'AllTransaksi',
    component: AllTransaksi,
    meta: { requiresAuth: true }
  },
  {
    path: '/report/lapkeujemaat',
    name: 'LapKeuJemaat',
    component: LapKeuJemaat
  },
  {
    path: '/editpage',
    name: 'EditPage',
    component: EditPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/report/findtransaksi',
    name: 'FindTransaksi',
    component: FindTransaksi,
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => { // pengecekan meta required
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('access_token')) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router

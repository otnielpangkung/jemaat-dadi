<template>
  <div id="app">
    <!-- Image and text -->
    <nav class="navbar navbar-light bg-light">
      <div class="title" href="#">
        <router-link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/id/thumb/8/82/Logo_Gereja_Toraja.png/240px-Logo_Gereja_Toraja.png"
            width="75"
            height="75"
            class="d-inline-block align-top"
          />
        </router-link>

        <p class="namaoig">GT - JEMAAT DADI</p>
      </div>

      <div id="nav" v-if="userLogin">
        <router-link to="/input">Input Transaksi</router-link> |
        <router-link to="/report/bydate"> Transaksi by Date </router-link> |
        <router-link to="/report/findtransaksi">
          Transaksi by Date
        </router-link>
        | <router-link to="/report/bulanan"> Monthly Report </router-link> |
        <router-link to="/report/lapkeujemaat">
          Laporan Keuangan Jemaat
        </router-link>
        |
        <router-link to="/transaksilist">Transaksi List</router-link>
      </div>
      <div>
        <button v-if="userLogin" class="btn btn-danger" @click.prevent="logout">
          Logout
        </button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    userLogin() {
      return this.$store.state.userLogin;
    }
  },
  methods: {
    dropdown() {
      console.log("massuuk on click");
      $(".dropdown-toggle").dropdown("toggle");
    },
    logout() {
      // console.log("Logout proses");
      localStorage.removeItem("access_token");
      localStorage.removeItem("cabang");
      this.$router.push("/login");
      this.$store.commit("setUserLogin", false);
    }
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.$store.commit("setUserLogin", true);
    }
  }
};
</script>

<style>
.title {
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 5mm;
  font-weight: bold;
  /* color: #2c3e50; */
}

.title a {
  color: aqua;
}
.jemaat {
  margin-top: 0%;
}

#nav a {
  font-weight: bold;
  font-size: 4mm;
  color: rgba(21, 62, 223, 0.87);
}

#nav a.router-link-exact-active {
  color: #03d9ff;
}

.jemaat {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #344fa1;
}

#nav {
  padding: 0px;
  font-size: 4mm;
  font-family: "Roboto", sans-serif;
}
.logo {
  width: 0mm;
  height: 5mm;
}
.namaoig {
  font-family: "Bebas Neue", cursive;
}
</style>
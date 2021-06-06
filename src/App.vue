<template>
  <div id="app">
    <Navbar></Navbar>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
#app {
  /* background: linear-gradient(
    82deg,
    rgb(233, 232, 232) 10%,
    rgb(255, 255, 255) 34%,
    rgb(255, 255, 255) 79%
  ); */

  height: 100vh;
}
.container {
  /* max-height: 15cm; */
  /* overflow: hidden; */
  margin-top: 5mm;
  margin-bottom: 2mm;
}
footer {
  margin-top: 15cm;
}
navbar {
  display: inline;
  background: linear-gradient(
    82deg,
    rgb(233, 232, 232) 10%,
    rgb(255, 255, 255) 34%,
    rgb(255, 255, 255) 79%
  );
}
</style>

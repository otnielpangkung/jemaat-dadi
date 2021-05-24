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
}
</style>

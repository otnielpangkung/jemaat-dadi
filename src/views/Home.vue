<template>
  <div class="home">
    <div class="logo-home">
      <img
        src="https://upload.wikimedia.org/wikipedia/id/thumb/8/82/Logo_Gereja_Toraja.png/240px-Logo_Gereja_Toraja.png"
        width="700"
        height="700"
        class="d-inline-block align-top"
      />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
    <!-- <Banner></Banner> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Banner from "../components/Banner";
export default {
  name: "Home",
  components: {
    HelloWorld,
    Banner
  }
};
</script>
<style scoped>
#logo-home {
  margin-top: 100px;
}
</style>
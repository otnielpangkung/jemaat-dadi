<template>
  <footer class="footer">
    <div class="col">
      <div class="isi-text">
        <p>Alamat Kantor : Jl. Anuang No.183, Makassar, Telp (0411) 873-401</p>
      </div>
      <!-- <div class="copy-right">erer</div> -->
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.isi-text {
  font-size: 5mm;
  color: rgb(238, 235, 235);
  display: flex;
  justify-content: center;
  margin-left: 1cm;
}
.footer {
  margin-top: 10mm;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-image: linear-gradient(
    72.1deg,
    rgba(0, 0, 128, 1) 1.7%,
    rgba(100, 149, 237, 1) 99.1%
  );
  /* background-image: linear-gradient( 359.8deg,  rgba(252,255,222,1) 2.2%, rgba(182,241,171,1) 99.3% );; */
}
</style>

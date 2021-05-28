<template>
  <div class="container">
    <div class="form-login">
      <form @submit.prevent="login" style="width - 18rem">
        <div class="form-group row">
          <label for="exampleInput11" class=" col-form-label"
            >PILIH OIG:
          </label>
          <select v-model="cabang" class="custom-select">
            <option v-for="cabang in listCabang" :key="cabang" :value="cabang">
              {{ cabang }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label
            for="exampleInput11"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          >
          </label>
          <input
            type="text"
            v-model="username"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="User Name"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1"></label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-primary">login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      listCabang: ["jemaat", "ppgt", "pwgt", "pkbgt", "smgt"],
      cabang: ""
    };
  },
  methods: {
    login() {
      let data = {
        username: this.username,
        password: this.password,
        cabang: this.cabang
      };
      this.$store
        .dispatch("login", data)
        .then(({ data }) => {
          localStorage.setItem("cabang", this.cabang);
          localStorage.setItem("access_token", data.access_token);
          this.$store.commit("setUserLogin", true);
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
}

.form-login {
  width: 100mm;

  margin-top: 20mm;
}
</style>
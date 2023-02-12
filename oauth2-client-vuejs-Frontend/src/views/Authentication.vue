<template>
  <div class="d-flex fill-height justify-center align-center flex-column">
    <span class="resource" v-show="this.token">{{ resource }}</span>

    <div class="my-3">
      <button v-on:click="logout()">logout</button>
    </div>

  </div>

</template>

<script>


export default {
  name: "Authentication",

  data() {
    return {
      resource: null,
      authCode: null,
      token: !localStorage.getItem('access_token') ? null : localStorage.getItem('access_token')
    }
  },
  mounted() {
    this.resource = localStorage.resourceContent
    const partiallyCode = window.location.href.slice(window.location.href.indexOf('code=') + 5).split("&");
    this.authCode = partiallyCode[0]

    if (!localStorage.access_token) {
      this.$store.dispatch('ACQUIRE_TOKEN', {code: this.authCode})
    } else if (localStorage.access_token && this.isTokenExpired(localStorage.access_token) === true) {
      localStorage.removeItem("access_token")
      this.$store.dispatch('SEND_REFRESH_TOKEN')
    }
    if (localStorage.access_token) {
      this.$store.dispatch('SEND_ACCESS_TOKEN_TO_RESOURCE_SERVER');
    }
  },
  methods: {
    isTokenExpired(token) {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    },
    logout() {
      this.$store.dispatch('LOGOUT');
      this.resource = null
    }
  },
}

</script>

<style scoped>

</style>

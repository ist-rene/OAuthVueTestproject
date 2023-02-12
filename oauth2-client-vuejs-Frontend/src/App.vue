<template>
  <nav>
    <img alt="Dave Health Logo" src="@/assets/DaveHealthLogo.png">
  </nav>
  <router-view/>
  <div>
    <dave-footer/>
  </div>
</template>

<script>
import DaveFooter from "@/components/DaveFooter";

export default {
  name: 'App',
  components: {
    DaveFooter
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  img {
    width: 20%;
    height: 20%;
  }

}
</style>

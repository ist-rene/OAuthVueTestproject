<template>
  <div>
    <HelloWorld msg="Welcome to Your Dave Health App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Welcome',
  components: {
    HelloWorld,
  },
  data() {
    return {
      step: 1
    }
  },
  mounted() {

    this.$store.dispatch('VERIFY_ACCESS')

  }
}
</script>

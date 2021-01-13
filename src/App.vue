<template>
  <Search />
</template>

<script>
import Search from "./components/Search.vue";

export default {
  name: "App",
  components: {
    Search
  }
};
</script>

<style lang="scss">
@import "styles/constants";

body {
  margin: 0 !important;
}

#app {
  height: 80px;
  background: $dark;
  padding-left: 12px;

  display: flex;
  align-items: center;
}
</style>

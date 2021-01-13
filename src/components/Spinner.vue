<template>
  <icon-base class="spinner" icon-name="spinner">
    <icon-spinner />
  </icon-base>
</template>

<script>
import IconBase from "@/components/IconBase";
import IconSpinner from "@/components/icons/IconSpinner";
export default {
  name: "Spinner",
  components: { IconSpinner, IconBase }
};
</script>

<style scoped>
.spinner {
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>

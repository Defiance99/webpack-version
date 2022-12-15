<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchResultNotFound',
});
</script>

<template>
  <div>
    <JIcon
      icon="searchResultNotFound"
      class="result-not-found-icon"
    />
    <h3 class="text-center mb-2">
      We couldn't find anything matching your search
    </h3>
    <p class="text-center">
      Try again with a different term.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.result-not-found-icon {
  display: block;
  margin: 0 auto 32px auto;
  width: 125px;
}
</style>

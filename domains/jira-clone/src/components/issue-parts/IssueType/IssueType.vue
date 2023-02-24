<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IssueType',
  props: {
    type: {
      type: [String, Boolean],
      default: null,
    },
    issueValue: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="issue-type">
    <JIcon
      v-if="type"
      :icon="type"
      container-size
      icon-wrapper
      size="16px"
      b-radius="0px"
    />

    <span class="issue-value">
      {{ issueValue }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.issue-type {
  display: flex;
  align-items: center;
}

.issue-value {
  padding-left: 6px;
  color: #6B778C;
}
</style>

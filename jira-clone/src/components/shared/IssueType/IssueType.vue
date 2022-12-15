<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IssueType',
  props: {
    type: {
      type: [String, Boolean],
      default: null,
    },
    id: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="issue-type">
    <span
      v-if="type"
      class="icon-wrapper"
    >
      <JIcon
        :icon="type"
        container-size
      />
    </span>

    <span class="issue-number">
      {{ id }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.issue-type {
  display: flex;
  align-items: center;
}

.icon-wrapper {
  display: flex;
  width: 16px;
  height: 16px;
}

.issue-number {
  padding-left: 6px;
  color: #6B778C;
}
</style>

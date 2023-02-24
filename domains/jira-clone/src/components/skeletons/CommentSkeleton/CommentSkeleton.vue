<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CommentSkeleton',
});
</script>

<template>
  <div class="comment-skeleton-container">
    <div class="comment-skeleton-avatar-skeleton">
      <JSkeleton
        width="35px"
        height="35px"
      />
    </div>

    <JSkeleton
      width="100%"
      height="40px"
      class="comment-skeleton-editor"
    />
  </div>
</template>

<style lang="scss" scoped>
.comment-skeleton-container {
  display: flex;
  align-items: center;
}

.comment-skeleton-avatar-skeleton {
  margin-right: 10px;
  border-radius: 100%;
}

.comment-skeleton-editor {
  border-radius: 8px;
}
</style>

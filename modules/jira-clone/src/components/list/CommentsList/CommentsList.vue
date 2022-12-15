<script lang="ts">
import { defineComponent } from 'vue';
import CommentsListItem from './CommentsListItem.vue';

export default defineComponent({
  name: 'CommentsList',
  components: {
    CommentsListItem,
  },
});
</script>

<template>
  <CommentsListItem
    editor
    class="mb-4"
  />
  <CommentsListItem />
</template>

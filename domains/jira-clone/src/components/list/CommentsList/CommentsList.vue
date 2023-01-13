<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IssueComment } from '@/interfaces/Issue.interface';
import CommentsListItem from './CommentsListItem.vue';

const onSaveCommentEmitName = 'save' as string;

export default defineComponent({
  name: 'CommentsList',
  components: {
    CommentsListItem,
  },
  emits: [onSaveCommentEmitName],
  props: {
    comments: {
      type: Array as PropType<IssueComment[]>,
      required: true,
    },
  },
  setup() {
    return {
      onSaveCommentEmitName,
    };
  },
});
</script>

<template>
  <CommentsListItem
    editor
    class="mb-4"
    @save="$emit(onSaveCommentEmitName, $event)"
  />
  <CommentsListItem
    v-for="(comment, index) in comments"
    :key="index"
    :comment="comment"
    class="mb-4"
  />
</template>

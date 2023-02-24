<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IssueComment } from '@/interfaces/Issue.interface';
import IssueEditor from '@/components/issue-parts/IssueEditor';
import useUserStore from '@/composables/store/useUserStore';

const onSaveCommentEmitName = 'save' as string;

export default defineComponent({
  name: 'CommentsListItem',
  components: {
    IssueEditor,
  },
  emits: [onSaveCommentEmitName],
  props: {
    editor: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: Object as PropType<IssueComment>,
      default: null,
    },
  },
  setup() {
    const { getUser } = useUserStore();

    return {
      getUser,
      onSaveCommentEmitName,
    };
  },
});
</script>

<template>
  <div class="comment-wrapper">
    <div class="comment-header">
      <JAvatar
        size="full"
        offset
      >
        <img
          :src="getUser?.image"
          alt=""
        >
      </JAvatar>

      <div class="comment-author">
        <span class="text-subtitle-4">
          {{ getUser?.name }}
        </span>

        <span
          v-if="editor === false"
          class="text-body-2 ml-3"
        >
          {{ comment.created }}
        </span>
      </div>
    </div>
    <div class="comment-body">
      <template v-if="editor">
        <IssueEditor
          placeholder="Add a comment"
          :border="true"
          m-focus
          class="mb-3"
          @save="$emit(onSaveCommentEmitName, $event)"
        />
      </template>
      <div
        v-else
        v-html="comment.html"
        class="comment-message"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-header {
  display: flex;
}

.comment-author {
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: var(--j-text);
}

.comment-body {
  margin-left: 42px;
}
</style>

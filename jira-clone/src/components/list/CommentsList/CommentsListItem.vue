<script lang="ts">
/* eslint-disable max-len */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CommentsListItem',
  props: {
    editor: {
      type: Boolean,
      default: false,
    },
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
          src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48"
          alt=""
        >
      </JAvatar>

      <div class="comment-author">
        <span class="text-subtitle-4">
          Vladimir Vo
        </span>

        <span
          v-if="editor === false"
          class="text-body-2 ml-3"
        >
          Nov 22, 2022, 4:46:06 PM
        </span>
      </div>
    </div>
    <div class="comment-body">
      <template v-if="editor">
        <JTextarea
          rows="1"
          placeholder="Placeholder text"
        />
        <div>
          <strong>
            Pro tip
          </strong>
          : press
          <span class="comment-hot-key-tip">
            M
          </span>
          to comment
        </div>
      </template>
      <div
        v-else
        class="comment-message"
      >
        sdafsdfsadf
      </div>
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

.comment-hot-key-tip {
  display: inline-block;
  padding: 3px 4px 3px;
  max-width: 100%;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  color: var(--j-text-subtitle);
  border-radius: 3px;
  background-color: #DFE1E6;
}

.j-textarea {
  &:hover:not(&:focus) {
    background: #ebecf0;
  }
}
</style>

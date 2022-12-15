<script>
import { defineComponent, defineAsyncComponent } from 'vue';
import DialogCloseIcon from '@/components/DialogCloseIcon';
import FormControl from '@/components/form/FormControl';
import FormControlActions from '@/components/form/FormControlActions';
import DialogTitle from '@/components/title/DialogTItle';

export default defineComponent({
  name: 'AddIssueDialog',
  components: {
    DialogCloseIcon,
    FormControl,
    FormControlActions,
    DialogTitle,
    WEditor: defineAsyncComponent(() => import('wysiwyg/WEditor')),
  },
});
</script>

<template>
  <div class="add-issue-dialog">
    <div class="issue-dialog-header">
      <DialogTitle>
        Create issue
      </DialogTitle>
      <DialogCloseIcon />
    </div>

    <FormControl>
      <template #label>
        Project
      </template>
      <JSelect
        :attach="false"
        :input="{ dense: true }"
      >
        <div
          v-for="(user, index) in [1,2,3,4,5]"
          :key="index"
          :value="user"
          class="select-item"
        >
          <span class="select-item-label">
            {{ user }} dfksaodljflads
          </span>
        </div>

        <template #prepend>
          helloy worlder
        </template>
      </JSelect>
    </FormControl>

    <FormControl>
      <template #label>
        Issue type
      </template>
      <JSelect
        :attach="false"
        :input="{ dense: true }"
      >
        <div
          v-for="(user, index) in [1,2,3,4,5]"
          :key="index"
          :value="user"
          class="select-item"
        >
          <span class="select-item-label">
            {{ user }} dfksaodljflads
          </span>
        </div>

        <template #prepend>
          helloy worlder
        </template>
      </JSelect>
    </FormControl>

    <FormControl>
      <template #label>
        Reporter
      </template>
      <JSelect
        :attach="false"
        :input="{ dense: true }"
      >
        <div
          v-for="(user, index) in [1,2,3,4,5]"
          :key="index"
          :value="user"
          class="select-item"
        >
          <span class="select-item-label">
            {{ user }} dfksaodljflads
          </span>
        </div>

        <template #prepend>
          helloy worlder
        </template>
      </JSelect>
    </FormControl>

    <FormControl>
      <template #label>
        Assignees
      </template>
      <JSelect
        :attach="false"
        :input="{ dense: true }"
      >
        <div
          v-for="(user, index) in [1,2,3,4,5]"
          :key="index"
          :value="user"
          class="select-item"
        >
          <span class="select-item-label">
            {{ user }} dfksaodljflads
          </span>
        </div>

        <template #prepend>
          helloy worlder
        </template>
      </JSelect>
    </FormControl>

    <FormControl>
      <template #label>
        Short summary
      </template>
      <JTextField
        dense
        name="summary"
        outlined
        :close-icon="false"
      />
    </FormControl>

    <FormControl class="issue-editor">
      <template #label>
        Description
      </template>
      <WEditor />
    </FormControl>

    <FormControlActions flex-end />
  </div>
</template>

<style lang="scss" scoped>
.issue-dialog-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.add-issue-dialog {
  width: 600px;
}

.issue-editor {
  margin-bottom: 28px;
}
</style>

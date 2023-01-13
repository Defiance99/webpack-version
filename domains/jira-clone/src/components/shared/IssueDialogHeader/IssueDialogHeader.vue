<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';
import { Issue } from '@/interfaces/Issue.interface';
import IssueType from '@/components/shared/IssueType';
import DialogTitle from '@/components/title/DialogTItle';
import FormControlActions from '@/components/form/FormControlActions';
import useFetchIssues from '@/composables/useFetchIssues';
import useIssuesStore from '@/composables/store/useIssuesStore';
import useLoaderUtils from '@/composables/useLoaderUtils';

const dialogCloseEmitName = 'close' as string;

export default defineComponent({
  name: 'IssueDialogHeader',
  components: {
    IssueType,
    DialogTitle,
    FormControlActions,
  },
  props: {
    issue: {
      type: Object as PropType<Issue>,
      required: true,
    },
  },
  emits: [dialogCloseEmitName],
  setup() {
    const { deleteIssue: deleteIssueFromStore } = useIssuesStore();
    const { deleteIssueById } = useFetchIssues();
    const { isLoad, startLoad, stopLoad } = useLoaderUtils();
    const confirmDialogModel = ref<boolean>(false);

    const openConfirmDialog = (): void => {
      confirmDialogModel.value = true;
    };

    const closeConfirmDialog = (): void => {
      confirmDialogModel.value = false;
    };

    const onDeleteIssue = async (issueId: number): Promise<void> => {
      startLoad();
      const isSuccessDeletedIssue: boolean = await deleteIssueById(issueId);

      if (isSuccessDeletedIssue) {
        deleteIssueFromStore(issueId);
      }
      stopLoad();
    };

    return {
      isLoad,
      onDeleteIssue,
      confirmDialogModel,
      closeConfirmDialog,
      openConfirmDialog,
      dialogCloseEmitName,
    };
  },
});
</script>

<template>
  <div class="issue-dialog-header">
    <IssueType
      :issue-value="issue.key"
      :type="issue.type"
    />

    <div class="issue-dialog-action-items">
      <JTooltip
        attach=".drawer-content-wrapper"
        label-size="s"
      >
        <template #activator="slotProps">
          <span
            v-ripple
            v-bind="slotProps"
            class="icon-wrapper j-icon-btn"
            @click="openConfirmDialog"
            @keydown.space="openConfirmDialog"
            @keydown.enter="openConfirmDialog"
          >
            <JIcon
              icon="trash"
              container-size
            />
          </span>
        </template>

        Remove issue
      </JTooltip>
      <JTooltip
        attach=".drawer-content-wrapper"
        label-size="s"
      >
        <template #activator="slotProps">
          <router-link
            v-ripple
            :to="`/project/${issue.project}/issue/${issue.id}`"
            v-bind="slotProps"
            class="icon-wrapper j-icon-btn"
          >
            <JIcon
              icon="expand"
              container-size
            />
          </router-link>
        </template>

        Go to issue
      </JTooltip>
      <JTooltip
        attach=".drawer-content-wrapper"
        label-size="s"
      >
        <template #activator="slotProps">
          <span
            v-ripple
            v-bind="slotProps"
            class="icon-wrapper j-icon-btn"
            @click="$emit(dialogCloseEmitName)"
            @keydown.space="$emit(dialogCloseEmitName)"
            @keydown.enter="$emit(dialogCloseEmitName)"
          >
            <JIcon
              icon="close"
              container-size
            />
          </span>
        </template>

        Cancel issue
      </JTooltip>
    </div>

    <JDialog v-model="confirmDialogModel">
      <DialogTitle class="mb-4">
        <span>
          Are you sure you want to delete issue?
        </span>
      </DialogTitle>
      <FormControlActions
        flex-end
        :is-load="isLoad"
        @click:cancel="closeConfirmDialog"
        @click:create="onDeleteIssue(issue.id)"
      >
        <template #cancel>
          Cancel
        </template>
        <template #create>
          <span>
            Confrim
          </span>
        </template>
      </FormControlActions>
    </JDialog>
  </div>
</template>

<style lang="scss" scoped>
.issue-dialog-action-items {
  display: flex;
  margin-left: auto;

  .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-left: 4px;
    width: 24px;
    height: 24px;
    color: var(--j-text-subtitle);
    cursor: pointer;
    border-radius: 3px;
    overflow: hidden;

    .j-icon {
      width: 16px;
      height: 16px;
    }
  }
}

.issue-dialog-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.icon-wrapper {
  display: flex;
  width: 16px;
  height: 16px;
}

.dialog-title {
  max-width: 280px;
}
</style>

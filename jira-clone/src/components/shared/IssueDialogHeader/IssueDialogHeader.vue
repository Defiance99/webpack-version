<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';
import type IssueInfo from '@/interfaces/IssueInfo.interface';
import IssueType from '@/components/shared/IssueType';

const emitDialogCloseName = 'close';

export default defineComponent({
  name: 'IssueDialogHeader',
  components: {
    IssueType,
  },
  props: {
    issue: {
      type: Object as PropType<IssueInfo>,
      required: true,
    },
  },
  emits: [emitDialogCloseName],
  setup() {
    const confirmDialogModel = ref<boolean>(false);

    const openConfirmDialog = (): void => {
      confirmDialogModel.value = true;
    };

    return {
      confirmDialogModel,
      openConfirmDialog,
      emitDialogCloseName,
    };
  },
});
</script>

<template>
  <div class="issue-dialog-header">
    <IssueType
      :id="issue.number"
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
            @click="$emit(emitDialogCloseName)"
            @keydown.space="$emit(emitDialogCloseName)"
            @keydown.enter="$emit(emitDialogCloseName)"
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
      Закрыть окно?
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
</style>

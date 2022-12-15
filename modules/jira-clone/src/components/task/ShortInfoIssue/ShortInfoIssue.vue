<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';
import type IssueInfo from '@/interfaces/IssueInfo.interface';
import AvatarsGroup from '@/components/group/AvatarsGroup';
import IssueDetails from '@/components/shared/IssueDetails';

const avatars: string[] = [
  // eslint-disable-next-line max-len
  'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
  // eslint-disable-next-line max-len
  'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
  // eslint-disable-next-line max-len
  'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
  // eslint-disable-next-line max-len
  'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
];

export default defineComponent({
  name: 'ShortInfoIssue',
  components: {
    AvatarsGroup,
    IssueDetails,
  },
  props: {
    issue: {
      type: Object as PropType<IssueInfo>,
      required: true,
    },
    watchersAvatars: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const issueDialogModel = ref<boolean>(false);

    const setDialogModel = (model: boolean): void => {
      issueDialogModel.value = model;
    };

    return { issueDialogModel, setDialogModel, avatars };
  },
});
</script>

<template>
  <JDialog v-model="issueDialogModel">
    <template #activator="slotProps">
      <JListItem
        v-ripple
        v-bind="slotProps"
        tabindex="0"
        class="short-issue-item mb-2"
      >
        <span class="icon-wrapper">
          <JIcon
            :icon="issue.type"
            container-size
          />
        </span>
        <div class="issue-info ml-4">
          <span class="issue-name">
            {{ issue.name }}
          </span>
          <span>
            <span class="issue-id">
              {{ issue.number }}
            </span>
            <span class="issue-label text-body-4 ml-2">
              Test project -
              {{ issue.project }}
            </span>
          </span>
        </div>

        <div
          v-if="watchersAvatars"
          class="avatar-group-wrapper"
        >
          <AvatarsGroup :avatars="avatars" />
        </div>
      </JListItem>
    </template>

    <IssueDetails
      :issue="issue"
      @close="setDialogModel(false)"
    />
  </JDialog>
</template>

<style lang="scss" scoped>
.short-issue-item {
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px;
  color: rgb(66 82 110);
  cursor: pointer;
}

.issue-info {
  display: flex;
  flex-direction: column;
  line-height: 16px;
}

.issue-name {
  font-size: 15px;
  font-weight: 400;
  color: var(--j-text-subtitle);
}

.avatar-group-wrapper {
  margin-left: auto;
}

.issue-id, .issue-label {
  font-size: 12px;
  color: var(--j-text-subtitle);
}

.icon-wrapper {
  display: flex;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}
</style>

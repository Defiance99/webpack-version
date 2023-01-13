<script lang="ts">
import { defineComponent } from 'vue';
import IssueType from '@/components/shared/IssueType';

export default defineComponent({
  name: 'IssueCard',
  components: {
    IssueType,
  },
  props: {
    issue: {
      type: Object,
      default: () => ({
        name: 'When creating an issue, the assignee list is not working properly on searching ',
        assignees: // eslint-disable-next-line max-len
        'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
        id: 'MP-173',
        type: 'bug',
        priority: 'story',
      }),
    },
  },
});
</script>

<template>
  <div class="issue-card">
    <div class="issue-card-grabber" />
    <p class="issue-card-title text-body-3">
      {{ issue.name }}
    </p>
    <div class="issue-card-info">
      <JIcon
        :icon="issue.type"
        icon-wrapper
        container-size
        size="18px"
        b-radius="0px"
      />
      <JIcon
        :icon="issue.priority"
        icon-wrapper
        container-size
        size="18px"
        b-radius="0px"
        class="ml-1"
      />
    </div>
    <div class="issue-card-info">
      <JAvatar size="xs">
        <img
          :src="issue.assignees"
          alt="assigner lgoo"
        >
      </JAvatar>
      <IssueType
        :id="issue.id"
        :type="false"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.issue-card {
  position: relative;
  padding: 10px 10px 10px 13px;
  border-radius: 2px;
  box-shadow: #091e4240 0 1px 2px;
  cursor: grab;
  background-color: #fff;
  transition-duration: 100ms;
  transition-timing-function: cubic-bezier(.4,0,.2,1);

  &:hover {
    background-color: #ebecf0;
  }
}

.issue-card-title {
  color: var(--j-text);
}

.issue-card-info {
  display: flex;
  align-items: center;
  margin-top: 10px;

  .j-avatar {
    justify-content: flex-start;
  }

  .issue-type {
    :deep(.issue-number) {
      padding-left: 0;
    }
  }
}

.issue-card-grabber {
  position: absolute;
  top: 5px;
  left: 5px;
  bottom: 5px;
  width: 3px;
  height: auto;
  background-color: var(--j-primary-color);
}
</style>

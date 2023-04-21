<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { Project } from '@/interfaces/Project.interfcace';
import useIssueUtils from '@/composables/utils/useIssueUtils';

const onSelectUserEmitName = 'select' as string;

export default defineComponent({
  name: 'FormControlUsersSelect',
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
    selectedUsersIds: {
      type: Array as PropType<number[]>,
      required: true,
    },
  },
  emits: [onSelectUserEmitName],
  setup(props) {
    const { selectedUsersIds } = toRefs(props);
    const { getProjectUsers: selectedUsers } = useIssueUtils(props.project, undefined, selectedUsersIds);

    return {
      selectedUsers,
      onSelectUserEmitName,
    };
  },
});
</script>

<template>
  <JSelect
    :modelValue="selectedUsersIds"
    multiple
    :input="{ regular: true }"
    @update:modelValue="$emit(onSelectUserEmitName, [...$event])"
  >
    <JOption
      v-for="(user, index) in project.users"
      :key="index"
      :value="user.id"
    >
      <span class="select-item-label">
        <img
          :src="user.image"
          alt="user image"
        >
        {{ user.name }}
      </span>
    </JOption>

    <template #result>
      <div
        v-for="(user, index) in selectedUsers"
        :key="index"
        class="selected-item"
      >
        <img
          :src="user?.image"
          class="selected-item-image"
          alt="user image"
        >
        <span class="selected-item-label">
          {{ user?.name }}
        </span>
      </div>
    </template>
  </JSelect>
</template>

<style lang="scss" scoped>
.j-text-field-wrapper {
  &.regular {
    .selected-item {
      margin-bottom: 4px;
    }
  }

  &.dense {
    .selected-item:first-child {
      margin-left: 8px;
    }
  }
}
.select-item-label {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;

  &.issue-status {
    justify-content: flex-end;
  }

  img {
    margin-left: 6px;
    width: 24px;
    height: 24px;
    border-radius: 4px;
  }
}

.selected-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  margin-bottom: 0px;

  .selected-item-image {
    display: flex;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    overflow: hidden;
  }

  .selected-item-label {
    margin-left: 6px;
  }
}
</style>

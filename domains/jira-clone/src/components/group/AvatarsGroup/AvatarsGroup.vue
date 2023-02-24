<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { User } from '@/interfaces/User.interface';

const emitClickName = 'change:active-avatar';

export default defineComponent({
  name: 'AvatarsGroup',
  props: {
    users: {
      type: Array as PropType<Array<User>>,
      required: true,
    },
    activeAvatars: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: 'full',
    },
  },
  emits: [emitClickName],
  setup(props, { emit }) {
    const onAvatarHover = (user: User): void => {
      emit(emitClickName, user);
    };

    return {
      onAvatarHover,
    };
  },
});
</script>

<template>
  <div class="j-avatar-group">
    <div
      v-for="(user, index) in users"
      :key="index"
      class="j-avatar-group-item"
      :class="{ selected: activeAvatars.includes(user) }"
    >
      <JTooltip
        attach=".drawer-content-wrapper"
      >
        <template #activator="slotProps">
          <JAvatar
            :size="size"
            offset
            v-bind="slotProps"
            @click="onAvatarHover(user)"
          >
            <img
              :src="user.image"
              alt="user-logo"
            >
          </JAvatar>
        </template>

        <span>
          {{ user.name }}
        </span>
      </JTooltip>
    </div>
  </div>
</template>

<style scoped lang="scss">
$avatar-offset: 0.25rem;

.j-avatar-group {
  display: flex;
  margin-left: $avatar-offset;

  .j-avatar-group-item {
    position: relative;
    bottom: 0;
    margin-left: -$avatar-offset;
    transition: bottom 100ms ease;
    cursor: pointer;

    &:hover {
      z-index: 5;
      bottom: 3px;
    }

    &.selected {
      z-index: 5;
      box-shadow: 0 0 0 1px #1255b9;
      border-radius: 50%;
    }
  }

  .j-avatar {
    border: 1px #fff solid;
  }
}
</style>

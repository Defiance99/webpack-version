<script lang="ts">
import { defineComponent } from 'vue';

const emitClickName = 'change:active-avatar';

export default defineComponent({
  name: 'AvatarsGroup',
  props: {
    avatars: {
      type: Array,
      required: true,
    },
    activeAvatars: {
      type: Array,
      default: () => [],
    },
  },
  emits: [emitClickName],
  setup(props, { emit }) {
    // TODO: add type
    const onAvatarHover = (avatar: any): void => {
      emit(emitClickName, avatar);
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
      v-for="(avatar, index) in avatars"
      :key="index"
      class="j-avatar-group-item"
      :class="{ selected: activeAvatars.includes(avatar) }"
    >
      <JTooltip
        attach=".drawer-content-wrapper"
      >
        <template #activator="slotProps">
          <JAvatar
            size="full"
            offset
            v-bind="slotProps"
            @click="onAvatarHover(emitClickName, avatar)"
          >
            <img
              :src="avatar"
              alt=""
            >
          </JAvatar>
        </template>

        <span>
          Vladimir
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

    &:hover {
      bottom: 3px;
      z-index: 5;
    }

    &.selected {
      box-shadow: 0 0 0 1px #1255b9;
      border-radius: 50%;
      z-index: 5;
    }
  }

  .j-avatar {
    border: 1px #fff solid;
  }
}
</style>

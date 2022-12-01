<script lang="ts">
import { defineComponent } from 'vue';

const clickEmitName = 'click';
const resizeEmitName = 'resize';

export default defineComponent({
  name: 'JResizer',
  props: {
    minResize: {
      type: Boolean,
      default: false,
    },
    resizeBtn: {
      type: Boolean,
      default: true,
    },
  },
  emits: [clickEmitName, resizeEmitName],
  setup(_, { emit }) {
    let isResizing = false;

    const keepResizing = (event: MouseEvent): void => {
      if (isResizing === false) return;

      emit(resizeEmitName, event.pageX);
    };

    const forbidSelection = async (): Promise<void> => {
      const html = document.querySelector('html');
      html?.classList.add('forbid-selection');
    };

    const allowSelection = async (): Promise<void> => {
      const html = document.querySelector('html');
      html?.classList.remove('forbid-selection');
    };

    const stopResizing = (): void => {
      allowSelection();
      isResizing = false;

      document.removeEventListener('mouseup', stopResizing);
      document.removeEventListener('blur', stopResizing);
      document.removeEventListener('mousemove', keepResizing);
    };

    const setEventListeners = (): void => {
      document.addEventListener('mouseup', stopResizing);
      document.addEventListener('blur', stopResizing);
      document.addEventListener('mousemove', keepResizing);
    };

    const beginResizing = (): void => {
      isResizing = true;

      forbidSelection();
      setEventListeners();
    };

    return {
      beginResizing,
      clickEmitName,
    };
  },
});
</script>

<template>
  <div
    class="app-resizer"
    @mousedown="beginResizing"
  >
    <JSemanticButton
      v-if="resizeBtn"
      class="resizer-btn"
      @mousedown.stop
      @mouseup.stop
      @click="$emit(clickEmitName)"
    >
      <div class="resizer-bg">
        <span
          class="resizer-icon"
          :class="{ 'min-resize': minResize }"
        >
          <JIcon icon="down" />
        </span>
      </div>
    </JSemanticButton>
    <div class="strip" />
    <div class="line" />
  </div>
</template>

<style lang="scss">
.forbid-selection {
  cursor: ew-resize;

  * {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
}
</style>

<style lang="scss" scoped>
$hover-transition: 250ms;

.app-resizer {
  display: flex;
  position: absolute;
  top: 0;
  right: -24px;
  bottom: 0;
  width: 24px;
  z-index: 1;
  cursor: ew-resize;

  &:hover {
    .line {
      opacity: 1;
    }
    .resizer-bg {
      background-color: var(--j-primary-color);
    }
    .resizer-icon {
      color: var(--j-primary-text-color);
    }
  }
}

.line {
  position: absolute;
  left: -2px;
  width: 2px;
  height: 100%;
  opacity: 0;
  transition: $hover-transition;
  background: var(--j-primary-color);
}

.strip {
  position: absolute;
  right: 24px;
  width: 3px;
  height: 100%;
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.2) 0px,
    rgba(0, 0, 0, 0.2) 1px,
    rgba(0, 0, 0, 0.1) 1px,
    rgba(0, 0, 0, 0) 100%
  );
}

.resizer-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 18px;
  right: 19px;
  width: 44px;
  height: 40px;
  z-index: 1;
  transition: $hover-transition;
}

.resizer-bg {
  width: 24px;
  height: 24px;
  background-color: var(--j-primary-text-color);
  border-radius: 50%;
  box-shadow: #091e4214 0 0 0 1px, #091e4214 0 2px 4px 1px;
  transition: $hover-transition;
}

.j-icon {
  transition: 300ms;
  transform: rotate(90deg);
}

.min-resize {
  .j-icon {
    transform: rotate(-90deg);
  }
}
</style>

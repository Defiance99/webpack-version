<script lang="ts">
import { defineComponent } from 'vue';

const onClickCancelEmitName = 'click:cancel';
const onClickCreateEmitName = 'click:create';

export default defineComponent({
  name: 'FormControlActions',
  props: {
    flexEnd: {
      type: Boolean,
      default: false,
    },
    directionReverse: {
      type: Boolean,
      default: false,
    },
    isLoad: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      onClickCancelEmitName,
      onClickCreateEmitName,
    };
  },
});
</script>

<template>
  <div
    class="form-control-actions"
    :class="{ end: flexEnd, reverse: directionReverse }"
  >
    <JButton
      type="normal"
      class="cancel-button"
      @click="$emit(onClickCancelEmitName)"
    >
      <slot name="cancel" />
    </JButton>

    <JButton
      class="create-button"
      @click="$emit(onClickCreateEmitName)"
    >
      <JSpinner
        v-if="isLoad"
        width="20px"
        height="20px"
      />
      <template v-else>
        <slot name="create" />
      </template>
    </JButton>
  </div>
</template>

<style lang="scss" scoped>
.form-control-actions {
  display: flex;

  &.end {
    justify-content: flex-end;
  }

  &.reverse {
    .create-button {
      margin-left: 0;
    }

    .cancel-button {
      order: 1;
      margin-left: 8px;
    }
  }

  .create-button {
    margin-left: 8px;
    min-width: 70px;
  }
}
</style>

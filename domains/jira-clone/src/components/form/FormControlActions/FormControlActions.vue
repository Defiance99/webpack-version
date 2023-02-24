<script lang="ts">
import { defineComponent } from 'vue';

const onClickCancelEmitName = 'click:cancel';
const onClickConfirmEmitName = 'click:confirm';

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
      onClickConfirmEmitName,
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
      class="confirm-button"
      @click="$emit(onClickConfirmEmitName)"
    >
      <JSpinner
        v-if="isLoad"
        width="20px"
        height="20px"
      />
      <template v-else>
        <slot name="confirm" />
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
    .confirm-button {
      margin-left: 0;
    }

    .cancel-button {
      order: 1;
      margin-left: 8px;
    }
  }

  .confirm-button {
    margin-left: 8px;
    min-width: 70px;
  }
}
</style>

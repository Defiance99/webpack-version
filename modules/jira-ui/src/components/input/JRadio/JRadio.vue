<script lang="ts">
/* eslint-disable */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JRadio',

});
</script>

<template>
  <div class="j-radio-control">
    <span class="j-radio-icon">
      <JIcon
        icon="radio"
        contrainer-size
      />
    </span>
    <input type="radio" class="j-radio-input">
    <span class="j-radio-ripple"></span>
  </div>
</template>

<style lang="scss" scoped>
.j-radio-control {
  display: flex;
  position: relative;
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    .j-radio-ripple {

      &::after {
        opacity: 0.2;
        transform: scale3d(1, 1, 1);
      }
    }
  }
}

.j-radio-input {
  position: absolute;
  margin: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  user-select: none;
}

.j-radio-icon {
  display: flex;
  width: 16px;
  height: 16px;
}

.j-radio-ripple {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
  border-radius: 50%;

  &::after {
    content: '';
    position: relative;
    width: 100%;
    height: 100%;
    transition: 300ms cubic-bezier(.25,.8,.5,1);
    opacity: 0;
    transform: scale3d(0.2, 0.2, 0.2);
    transform-origin: center center;
    border-radius: 50%;
    background-color: currentColor;
  }
}
</style>

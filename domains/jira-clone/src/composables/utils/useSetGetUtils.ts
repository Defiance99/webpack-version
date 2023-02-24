import { readonly, computed, shallowRef } from 'vue';
import computedEager from 'UI/utils/useComputedEager';

export default <T>(defaultValue: T, useComputed = true) => {
  const model = shallowRef<T>(defaultValue);

  const setter = (value: T) => {
    model.value = value;

    return readonly(model);
  };

  let getter;

  if (useComputed) {
    if (typeof defaultValue === 'boolean') {
      getter = computedEager(() => model.value);
    } else {
      getter = computed(() => model.value);
    }
  } else {
    getter = model;
  }

  return {
    setter,
    getter,
  };
};

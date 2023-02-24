import { watchEffect, shallowRef, readonly } from 'vue';

export default function computedEager<T>(fn: () => T) {
  const result = shallowRef();

  watchEffect(
    () => {
      result.value = fn();
    },
    {
      flush: 'sync',
    },
  );

  return readonly(result);
}

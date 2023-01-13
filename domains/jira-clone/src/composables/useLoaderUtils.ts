import { ref, computed } from 'vue';

export default () => {
  const loadingStatus = ref<boolean>(false);

  const startLoad = (): void => {
    loadingStatus.value = true;
  };

  const stopLoad = (): void => {
    loadingStatus.value = false;
  };

  const isLoad = computed(() => loadingStatus.value);

  return {
    startLoad,
    stopLoad,
    isLoad,
  };
};

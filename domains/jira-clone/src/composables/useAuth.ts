import { ref, computed } from 'vue';

const userIsAuth = ref(true);

export default () => {
  const isAuth = computed(() => userIsAuth.value);

  return {
    isAuth,
  };
};

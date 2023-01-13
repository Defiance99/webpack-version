import { computed, shallowRef } from 'vue';
import { User } from '@/interfaces/User.interface';

const userData = shallowRef<User | null>({
  id: 1,
  name: 'Vladimir',
  image:
    'https://res.cloudinary.com/doqir4zpe/image/upload/v1672093312/48_dxrmlo.png',
  projects: [1],
});

export default () => {
  const getUser = computed(() => userData.value);

  return {
    getUser,
  };
};

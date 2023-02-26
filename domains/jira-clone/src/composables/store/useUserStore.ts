import { computed, shallowRef } from 'vue';
import { User } from '@/interfaces/User.interface';

const userData = shallowRef<User | null>({
  id: 1,
  name: 'Vladimir',
  image:
    'https://res.cloudinary.com/doqir4zpe/image/upload/v1677445292/1673000203649_wohcbd.jpg',
  projects: [1],
});

export default () => {
  const getUser = computed(() => userData.value);

  return {
    getUser,
  };
};

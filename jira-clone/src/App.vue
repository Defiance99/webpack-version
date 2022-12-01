<script setup lang="ts">
// import { inject, ref } from "vue";
import useTheme from 'UI/utils/useTheme';
import { RouterView } from 'vue-router';
// import LayoutDefault from "@/layouts/LayoutDefault.vue";

const { initTheme } = useTheme();

initTheme();

// const db = inject("db");

// const test = (form) => {
//   console.log(db);
//   db.post(form).then(() => {
//     console.log("YEP");
//   });
// };

// const currentUser = ref(null);

// const userForm = ref({
//   id: 0,
//   name: "test",
//   email: "test@mail.ru",
// });

// const updateUserName = (userName) => {
//   currentUser.value = userName;
// };

// const subscribeTo = (userId) => {
//   db.subscribeTo(userId, updateUserName);
// };
</script>

<template>
  <div>
    <!-- <input v-model="userForm.id" type="text" name="name" />
    <input v-model="userForm.name" type="text" name="name" />
    <input v-model="userForm.email" type="email" name="name" />
    <button @click="test(userForm)">Click me!</button> -->
    <component :is="$route.meta.layout || 'div'">
      <RouterView />
    </component>

    <JOverlayRoot />
    <!-- <h2>Current user name: {{ currentUser }}</h2>
    <input v-model="userForm.id" type="text" name="name" />
    <AppButton @click="subscribeTo(userForm.id)">Click me!</AppButton>
    <q-btn color="black" label="Black" /> -->
  </div>
</template>

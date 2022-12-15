/* eslint-disable */

// import type { App } from 'vue';
// import { initializeApp } from 'firebase/app';
// import {
//   getDatabase, ref, set, onValue,
// } from 'firebase/database';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBI86JGhJPBWCjRdq8oCggnQNgMLaFTu3k',
//   authDomain: 'jira-clone-aabf6.firebaseapp.com',
//   databaseURL: 'https://jira-clone-aabf6-default-rtdb.europe-west1.firebasedatabase.app',
//   projectId: 'jira-clone-aabf6',
//   storageBucket: 'jira-clone-aabf6.appspot.com',
//   messagingSenderId: '199257013723',
//   appId: '1:199257013723:web:e8f6d5070257c0c9113bfe',
//   measurementId: 'G-543L4Z213K',
// };

// export default {
//   install(vueApp: App) {
//     const firebaseApp = initializeApp(firebaseConfig);
//     const database = getDatabase();
//     console.log(vueApp, firebaseApp, database);

//     const post = ({ name, email, id }: { name: string; email: string; id: string; }): Promise<void> => {
//       console.log('123');

//       return set(ref(database, `test/${id}`), {
//         username: name,
//         email,
//       });
//     };

//     const subscribeTo = (userId: number, callback: Function) => {
//       const userIdRef = ref(database, `test/${userId}`);

//       onValue(userIdRef, (user) => {
//         const data = user.val();
//         callback(data);
//       });
//     };

//     vueApp.provide('db', {
//       app: firebaseApp,
//       post,
//       subscribeTo,
//     });
//   },
// };

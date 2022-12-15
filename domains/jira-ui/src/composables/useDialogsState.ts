import { ref } from 'vue';

const openDialogsState = ref<HTMLElement[]>([]);

export default () => {
  const addDialog = (dialogRef: HTMLElement): void => {
    openDialogsState.value.push(dialogRef);
  };

  const removeDialog = (): void => {
    console.log(123);
  };

  const closeAll = (): void => {
    // openDialogsState.value.forEach((openDialog) => openDialog.close(false));
  };

  return {
    addDialog,
    removeDialog,
    closeAll,
  };
};

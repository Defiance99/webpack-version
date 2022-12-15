<script lang="ts">
import { defineComponent, ref } from 'vue';
import IssueCard from '@/components/card/IssueCard';

const dragStartEventName = 'onDragStart';
const dragnedStartEventName = 'onDragEnd';

export default defineComponent({
  name: 'ProjectBoardColumnItem',
  components: {
    IssueCard,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  emits: [dragStartEventName, dragnedStartEventName],
  setup() {
    const isDragStart = ref(false);

    const onDragStart = (event: DragEvent): void => {
      console.log(event, event.dataTransfer);
      if (event.dataTransfer === null) return;
      isDragStart.value = true;
    };

    const onDragEnd = (event: DragEvent): void => {
      console.log(event);
      isDragStart.value = false;
    };

    return {
      isDragStart,
      onDragStart,
      onDragEnd,
    };
  },
});
</script>

<template>
  <div class="project-board-column-item">
    <h3>Id: {{ item.id }}</h3>
    <h3>Order: {{ item.order }}</h3>
    <h3>Column {{ item.column }}</h3>
    <IssueCard
      :class="{ 'drag-choosen': isDragStart }"
    />
  </div>
</template>

<style lang="scss" scoped>
.project-board-column-item {
  position: relative;
  margin-top: 6px;
}

.test {
  position: absolute;
  // top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: green;
}

.drag-choosen {
  position: relative;
  opacity: 0.5;
}
</style>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

interface Breadcrumb {
  name: string;
  param?: boolean;
  link?: string;
}

export default defineComponent({
  name: 'AppBreadcrumbs',
  props: {
    topMargin: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const route = useRoute();
    const breadcrumbsList = ref<Breadcrumb[]>([]);

    const resetBreadcrumbsList = (): void => {
      breadcrumbsList.value = [];
    };

    const setNewBreadcrumbs = async (): Promise<void> => {
      resetBreadcrumbsList();

      const pageBreadcrumbs = route.meta.breadcrumbs as Breadcrumb[] | undefined;

      if (pageBreadcrumbs) {
        pageBreadcrumbs.forEach((breadcrumb: Breadcrumb) => {
          const copyBreadcrumb: Breadcrumb = { ...breadcrumb };

          if (breadcrumb.param && route.params[breadcrumb.name]) {
            copyBreadcrumb.name = route.params[breadcrumb.name] as string;

            breadcrumbsList.value.push(copyBreadcrumb);
          } else {
            breadcrumbsList.value.push(copyBreadcrumb);
          }
        });
      }
    };

    watch(
      () => route.path,
      () => {
        setNewBreadcrumbs();
      },
      { immediate: true },
    );

    return {
      breadcrumbsList,
    };
  },
});
</script>

<template>
  <div
    class="app-breadcrumbs mb-4"
    :class="{ 'mt-7': topMargin }"
  >
    <ul class="breadcrumbs-list">
      <li
        v-for="(breadcrumb, index) in breadcrumbsList"
        :key="index + breadcrumb.name"
        class="breadcrumbs-list-item"
      >
        <span
          v-if="index > 0"
          class="breadcrumb-divider"
        >
          /
        </span>
        {{ breadcrumb.name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumbs-list {
  display: flex;
  flex-wrap: wrap;
}

.breadcrumbs-list-item {
  color: #5e6c84;
}

.breadcrumb-divider {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  margin-left: 12px;
}
</style>

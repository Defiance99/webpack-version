<script lang="ts">
import { defineComponent } from 'vue';
import AvatarsGroup from '@/components/group/AvatarsGroup';

export default defineComponent({
  name: 'ProjectBoardFilter',
  components: {
    AvatarsGroup,
  },
  setup() {
    const avatars: string[] = [
      // eslint-disable-next-line max-len
      'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
      // eslint-disable-next-line max-len
      'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
      // eslint-disable-next-line max-len
      'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
      // eslint-disable-next-line max-len
      'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
    ];

    return {
      avatars,
    };
  },
});
</script>

<template>
  <div class="project-board-filter">
    <JTextField
      v-model="searchValue"
      placeholder="Search"
      :close-icon="false"
      name="search"
      outlined
      dense
      class="filter-input"
    >
      <template #prepend>
        <span class="search-icon-wrapper">
          <JIcon
            icon="search"
            container-size
          />
        </span>
      </template>
    </JTextField>

    <AvatarsGroup
      size="s"
      :avatars="avatars"
    />
  </div>
</template>

<style lang="scss" scoped>
.project-board-filter {
  display: flex;
}

.search-icon-wrapper {
  display: flex;
  width: 16px;
  height: 16px;
}

.filter-input {
  margin-right: 16px;
  max-width: 180px;
}

.j-avatar-group {
  align-items: center;
}
</style>

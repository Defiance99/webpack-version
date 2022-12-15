<script lang="ts">
/* eslint-disable max-len */
import { defineComponent, ref } from 'vue';
import User from '@/interfaces/User.interface';

export default defineComponent({
  name: 'IssueAboutDetailsGroup',
  setup() {
    const selectedAssignees = ref<User[]>([]);
    const users = ref([
      {
        name: 'Vladimir',
        image: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
      },
      {
        name: 'Thor',
        image: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
      },
      {
        name: 'Zeus',
        image: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
      },
      {
        name: 'Def',
        image: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
      },
      {
        name: 'My name is gladiator',
        image: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
      },
      {
        name: 'Hellscream',
        image: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48',
      },
    ]);

    return {
      users,
      selectedAssignees,
    };
  },
});
</script>

<template>
  <div class="issue-details-group">
    <span class="issue-label"> Status </span>
    <div class="mb-5">
      Selected for Development
    </div>

    <span class="issue-label"> Reporter </span>
    <div class="mb-5">
      <JSelect
        v-model="selectedAssignees"
        multiple
        :input="{ regular: true }"
        :attach="false"
      >
        <JOption
          v-for="(user, index) in users"
          :key="index"
          :value="user"
        >
          <span class="select-item-label">
            <img
              src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48"
              alt=""
            >
            {{ user.name }}
          </span>
        </JOption>

        <template #result>
          <span
            v-for="(user, index) in selectedAssignees"
            :key="index"
          >
            <span class="select-item-label">
              {{ user.name }}
              <img
                src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48"
                alt=""
              >
            </span>
          </span>
        </template>
      </JSelect>
    </div>

    <span class="issue-label"> Assignees </span>
    <div class="mb-5">
      <JSelect
        v-model="selectedAssignees"
        multiple
        chips
        :input="{ regular: true }"
        :attach="false"
      >
        <JOption
          v-for="(user, index) in users"
          :key="index"
          :value="user.name"
        >
          <span class="select-item-label">
            <img
              src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/60ade11f54ac21007240527f/244e51a6-01e2-4617-ac9c-2756b03f2586/48"
              alt=""
            >
            {{ user.name }}
          </span>
        </JOption>
      </JSelect>
    </div>

    <span class="issue-label"> Priority </span>
    <div class="mb-6">
      <JSelect
        v-model="selectedAssignees"
        :attach="false"
        :input="{ regular: true }"
      >
        <div
          v-for="(user, index) in [1,2,3,4,5]"
          :key="index"
          :value="user"
          class="select-item"
        >
          <span class="select-item-label">
            {{ user }} dfksaodljflads
          </span>
        </div>

        <template #prepend>
          helloy worlder
        </template>
      </JSelect>
    </div>

    <p class="issue-date-create">
      Created - Jun 28, 2020, 6:30:00 PM
      <br>
      Updated - Jun 28, 2020, 7:30:00 PM
    </p>
  </div>
</template>

<style lang="scss" scoped>
.issue-details-group {
  position: relative;
  max-width: 300px;
  width: 100%;
}

.issue-label {
  color: var(--j-text-subtitle);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.issue-date-create {
  font-size: 12px;
  color: var(--j-text-subtitle);
}

.select-item {
  display: flex;
  width: 100%;

  .select-item-label {
    justify-content: center;
  }
}

.select-item-label {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;

  img {
    margin-left: 6px;
    width: 24px;
    height: 24px;
    border-radius: 4px;
  }
}
</style>

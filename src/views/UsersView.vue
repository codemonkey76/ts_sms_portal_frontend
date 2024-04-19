<script lang="ts" setup>
import Paginator from '@/components/Paginator.vue'
import listUsers from '@/composables/listUsers'
import { usePaginator } from '@/composables/usePagination'
import { ref, watch } from 'vue'
import ButtonPrimary from '@/components/buttons/ButtonPrimary.vue'
import UserEditModal from '@/components/modals/UserEditModal.vue'
const { options } = usePaginator("users")
const { users, meta } = listUsers(options);

const pageChangeHandler = (page: number) => {
  options.value.page = page;
}

const perPageChangeHandler = (perPage: number) => {
  options.value.per_page = perPage;
}

const showModal = ref(false)
const editUser = () => {
  showModal.value = true
}
const handleClose = (e) => {
  showModal.value = false;
}
</script>
<template>
  <div class="flex flex-col px-6 py-2">
    <h2 class="text-2xl font-semibold text-gray-900 pb-4 mb-6 border-b">Users</h2>
    <div class="flex flex-col">
      <button-primary @click="editUser">Show Modal</button-primary>
      <user-edit-modal :show="showModal" @close="handleClose" />
      <div
        class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-primary-600">
        <label class="block text-xs font-medium text-gray-900" for="name">Search</label>
        <input id="name" v-model="options.search" autocomplete="off" class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" data-lpignore="true" name="name"
          placeholder="Search"
          type="text" />
      </div>
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              scope="col">
              ID
            </th>
            <th class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">
              Name
            </th>
            <th class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">
              Email
            </th>
            <th class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">
              Active
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="user in users" :key="user.id">
            <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
              {{ user.id }}
            </td>
            <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
              {{ user.name }}
            </td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
              {{ user.email }}
            </td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
              {{ user.active }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="meta">
        <paginator :meta="meta" @change-per-page="perPageChangeHandler" @change-page="pageChangeHandler"></paginator>
      </div>
    </div>
  </div>
</template>

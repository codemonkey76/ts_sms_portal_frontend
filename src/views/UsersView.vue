<script setup lang="ts">
import Paginator from '@/components/Paginator.vue'
import listUsers from '@/composables/listUsers'
import { usePaginator }  from '@/composables/usePagination'

const { options } = usePaginator("users")
const { users, loading, meta } = listUsers(options);

const pageChangeHandler = (page: number) => {
  options.value.page = page;
}

const perPageChangeHandler = (perPage: number) => {
  options.value.per_page = perPage;
}

</script>
<template>
  <div class="flex flex-col px-6 py-2">
    <h2 class="text-2xl font-semibold text-gray-900 pb-4 mb-6 border-b">Users</h2>
  <div v-if="!loading" class="flex flex-col">
    <div class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
      <label for="name" class="block text-xs font-medium text-gray-900">Search</label>
      <input v-model="options.search" type="text" name="name" id="name" class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Search" />
    </div>
    <table class="min-w-full divide-y divide-gray-300">
      <thead>
      <tr>
        <th
          scope="col"
          class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
        >
          ID
        </th>
        <th
          scope="col"
          class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Name
        </th>
        <th
          scope="col"
          class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Email
        </th>
        <th
          scope="col"
          class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
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
      <paginator @change-per-page="perPageChangeHandler" @change-page="pageChangeHandler" :meta="meta" ></paginator>
    </div>
  </div>
  </div>
</template>

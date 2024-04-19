<script lang="ts" setup>
import type { PaginatorLink } from '@/types/PaginatorLink'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { usePagination } from '@/composables/usePagination'
import type { PaginatorEvents } from '@/types/PaginatorEvents';
import type { PaginatorProps } from '@/types/PaginatorProps';
import { ref, watch } from 'vue'

const props = defineProps<{meta: PaginatorProps}>();

const links = ref<PaginatorLink[]>([])
const hasPrevious = ref(false)
const hasNext = ref(false)

const emits = defineEmits<PaginatorEvents>();

const changePage = (page: number) => {
  emits('changePage', page);
};

const handlePerPageChange = (perPage: number) => {
  emits('changePerPage', perPage);
};

watch(() => props.meta, (newMeta) => {
  const { links: updatedLinks, hasPrevious: updatedHasPrevious, hasNext: updatedHasNext } = usePagination(newMeta);
  links.value = updatedLinks;
  hasPrevious.value = updatedHasPrevious;
  hasNext.value = updatedHasNext;
}, {immediate:true});

const pageOptions = [10, 25, 50, 100];

</script>

<template>
  <div v-if="meta" class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <a class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" href="#">Previous</a>
      <a class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" href="#">Next</a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          {{ ' ' }}
          <span class="font-medium">{{ meta.from}}</span>
          {{ ' ' }}
          to
          {{ ' ' }}
          <span class="font-medium">{{ meta.to }}</span>
          {{ ' ' }}
          of
          {{ ' ' }}
          <span class="font-medium">{{ meta.total }}</span>
          {{ ' ' }}
          results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <label class="rounded-l-md relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-700 focus:z-20 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0">Per page:</label>
          <template v-for="(option, index) in pageOptions" :key="index">
          <a
            :class="{
                'z-10 bg-primary-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600' : option==props.meta.per_page,
                'ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0': option!=props.meta.per_page,
                'text-gray-900': option==props.meta.per_page,
                'rounded-r-md': index == pageOptions.length - 1
                }"
            :href="option!=props.meta.per_page ? '#' : undefined"
            class="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20"
            @click="handlePerPageChange(option)"
          >{{ option }}</a>
          </template>
        </nav>
      </div>
      <div>
        <nav aria-label="Pagination" class="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <a
            :class="hasPrevious ? 'tet-gray-900' : 'text-gray-400'"
            :href="hasPrevious ? '#' : undefined"
            class="rounded-l-md relative inline-flex items-center px-2 py-2 text-sm font-semibold focus:z-20 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
            @click.prevent="hasPrevious && changePage(props.meta.current_page - 1)"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon aria-hidden="true" class="h-5 w-5" />
          </a>

          <template v-for="(link, index) in links" :key="index">
            <a
              :aria-current="link.current ? 'page' : undefined"
              :class="{
                'z-10 bg-primary-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600' : link.current,
                'ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0': !link.current,
                'text-gray-900': link.value,
                'text-gray-400': !link.value
                }"
              :href="link.value && !link.current ? '#' : undefined"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20"
              v-html="link.label"
              @click.prevent="link.value && !link.current && changePage(link.value)"
            ></a>


          </template>
          <a
            :class="hasNext ? 'tet-gray-900' : 'text-gray-400'"
            :href="hasNext ? '#' : undefined"
            class="rounded-r-md relative inline-flex items-center px-2 py-2 text-sm font-semibold focus:z-20 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
            @click.prevent="hasNext && changePage(props.meta.current_page + 1)"
          >
            <span class="sr-only">Previous</span>
            <ChevronRightIcon aria-hidden="true" class="h-5 w-5" />
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
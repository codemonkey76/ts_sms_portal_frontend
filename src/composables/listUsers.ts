import type { PaginationOptions } from '@/types/PaginationOptions';
import type { PaginatorProps } from '@/types/PaginatorProps';
import type { User } from '@/types/User';
import axios from 'axios';
import { type Ref, ref } from 'vue';
import { watchDebounced } from '@vueuse/core';

const listUsers = (props: Ref<PaginationOptions>) => {
  const loading = ref(false);
  const users = ref<User[]>([]);
  const meta = ref<PaginatorProps|null>(null);

  const fetchUsers = async () => {
    loading.value = true;
    try {
      const response = await axios.get('/users', {
        params: {
          page: props.value.page,
          per_page: props.value.per_page,
          search: props.value.search
        }
      })
      if (response) {
        users.value = response.data.data;
        meta.value = response.data.meta;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  const refresh = async () => {
    await fetchUsers();
  }

  watchDebounced(() => props.value, async () => {
    await fetchUsers();
  }, {debounce: 500, maxWait: 1000, immediate: true, deep: true});

  return {users, loading, meta, refresh}
}

export default listUsers;
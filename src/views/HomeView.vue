<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'

const users = ref([])
const links = ref([])
const meta = ref({})

const fetchUsers = async () => {
  const response = await axios.get('/users')
  users.value = response.data.data
  links.value = response.data.links
  meta.value = response.data.meta
}

fetchUsers()
onMounted(() => {
  console.log('Home view mounted')
})
</script>
<template>
  <div class="flex flex-col">
    <div class="overflow-y-scroll">
      <ul>
        <li class="py-3" v-for="user in users" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
    </div>
  </div>

  <!--         <table class="min-w-full divide-y divide-gray-300"> -->
  <!--           <thead> -->
  <!--             <tr> -->
  <!--               <th -->
  <!--                 scope="col" -->
  <!--                 class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0" -->
  <!--               > -->
  <!--                 ID -->
  <!--               </th> -->
  <!--               <th -->
  <!--                 scope="col" -->
  <!--                 class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900" -->
  <!--               > -->
  <!--                 Name -->
  <!--               </th> -->
  <!--               <th -->
  <!--                 scope="col" -->
  <!--                 class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900" -->
  <!--               > -->
  <!--                 Email -->
  <!--               </th> -->
  <!--               <th -->
  <!--                 scope="col" -->
  <!--                 class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900" -->
  <!--               > -->
  <!--                 Active -->
  <!--               </th> -->
  <!--             </tr> -->
  <!--           </thead> -->
  <!--           <tbody class="divide-y divide-gray-200 bg-white"> -->
  <!--             <tr v-for="user in users" :key="user.id"> -->
  <!--               <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"> -->
  <!--                 {{ user.id }} -->
  <!--               </td> -->
  <!--               <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"> -->
  <!--                 {{ user.name }} -->
  <!--               </td> -->
  <!--               <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900"> -->
  <!--                 {{ user.email }} -->
  <!--               </td> -->
  <!--               <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500"> -->
  <!--                 {{ user.active }} -->
  <!--               </td> -->
  <!--             </tr> -->
  <!--           </tbody> -->
  <!--         </table> -->
  <!--       </div> -->
  <!--     </div> -->
  <!--   </div> -->
  <!-- </div> -->
</template>

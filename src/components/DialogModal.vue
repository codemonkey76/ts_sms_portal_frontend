<script lang="ts" setup>
import Modal from '@/components/Modal.vue'
import { defineEmits } from 'vue'

const props = defineProps({
  show: Boolean,
  maxWidth: String
})

const emit = defineEmits(['close'])

const handleClose = (e) => {
  emit('close', e)
}
</script>
<template>
  <modal :max-width="maxWidth" :show="show" @close="handleClose">
    <div>
      <div class="px-6 py-4 text-lg bg-primary-600 text-white">
        <slot name="title"></slot>
      </div>
      <div class="px-6 py-4 mt-4">
        <slot name="content"></slot>
      </div>
    </div>
    <div class="px-6 py-4 bg-gray-100 text-right">
      <slot name="footer"></slot>
    </div>
  </modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import { defineEmits } from 'vue';

const props = defineProps({
  show: Boolean,
  maxWidth: String,
});

const emit = defineEmits(['close'])

const handleClose = (e) => {
  emit('close', e);
}

</script>
<template>
  <modal :max-width="maxWidth" :show="show" @close="handleClose">
    <div class="px-6 py-4">
      <div class="text-lg">
        <slot name="title"></slot>
      </div>
      <div class="mt-4">
        <slot name="content"></slot>
      </div>
    </div>
    <div class="px-6 py-4 bg-gray-100 text-right">
      <slot name="footer"></slot>
    </div>
  </modal>
</template>

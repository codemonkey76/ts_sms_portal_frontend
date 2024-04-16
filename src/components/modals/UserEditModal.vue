<script setup lang="ts">
import DialogModal from '@/components/DialogModal.vue'
import ButtonPrimary from '@/components/buttons/ButtonPrimary.vue'
import ButtonSecondary from '@/components/buttons/ButtonSecondary.vue'
import TextInput from '@/components/inputs/TextInput.vue'

defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])

const handleClose = (e) => {
  emit('close', e)
}

const handleSave = async () => {
  console.log('Handling Save')
}
</script>
<template>
  <dialog-modal :show="show" @close="handleClose">
    <template #title>
      <div class="font-semibold text-xl">Edit User</div>
    </template>
    <template #content>
      <div class="space-y-4">
        <text-input name="name" label="Name" />
        <text-input name="email" label="Email" />
        <text-input name="password" label="Password" />
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <div>foo</div>
        <div class="flex space-x-2">
          <button-secondary @click="handleClose">Cancel</button-secondary>
          <button-primary @click="handleSave">OK</button-primary>
        </div>
      </div>
    </template>
  </dialog-modal>
</template>

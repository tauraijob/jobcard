<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('update:isOpen', false)"></div>
      
      <div class="relative w-full max-w-md bg-white rounded-lg shadow-xl">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            {{ isEditing ? 'Edit List' : 'Add New List' }}
          </h2>
          
          <form @submit.prevent="handleSubmit">
            <div class="space-y-4">
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700">List Title</label>
                <input
                  id="title"
                  v-model="title"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter list title"
                >
              </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                @click="$emit('update:isOpen', false)"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                :disabled="!title.trim()"
              >
                {{ isEditing ? 'Save Changes' : 'Add List' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  title: {
    type: String,
    default: ''
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:isOpen', 'save'])
const title = ref('')

function handleSubmit() {
  if (title.value.trim()) {
    emit('save', title.value.trim())
    title.value = ''
    emit('update:isOpen', false)
  }
}

onMounted(() => {
  if (props.isEditing && props.title) {
    title.value = props.title
  }
})
</script> 
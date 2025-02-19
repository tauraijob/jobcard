<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('update:isOpen', false)"></div>
      
      <div class="relative w-full max-w-md bg-white rounded-lg shadow-xl">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            Board Settings
          </h2>

          <form @submit.prevent="saveSettings">
            <div class="space-y-6">
              <!-- Board Title -->
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700">Board Title</label>
                <input
                  id="title"
                  v-model="settings.title"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
              </div>

              <!-- Visibility -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Visibility</label>
                <div class="mt-2 space-y-2">
                  <div class="flex items-center">
                    <input
                      id="private"
                      v-model="settings.visibility"
                      type="radio"
                      value="private"
                      class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    >
                    <label for="private" class="ml-3 block text-sm text-gray-700">
                      Private - Only board members can access
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="team"
                      v-model="settings.visibility"
                      type="radio"
                      value="team"
                      class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    >
                    <label for="team" class="ml-3 block text-sm text-gray-700">
                      Team - All team members can access
                    </label>
                  </div>
                </div>
              </div>

              <!-- Background -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Background</label>
                <div class="mt-2 flex flex-wrap gap-2">
                  <button
                    v-for="color in backgroundColors"
                    :key="color"
                    type="button"
                    @click="settings.background = color"
                    class="w-8 h-8 rounded-full border-2"
                    :class="[
                      settings.background === color ? 'border-blue-500' : 'border-transparent',
                    ]"
                    :style="{ backgroundColor: color }"
                  />
                </div>
              </div>

              <!-- Labels -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Default Labels</label>
                <div class="mt-2 flex flex-wrap gap-2">
                  <div
                    v-for="(label, index) in settings.labels"
                    :key="index"
                    class="flex items-center space-x-2"
                  >
                    <input
                      v-model="label.name"
                      type="text"
                      class="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                    <button
                      type="button"
                      @click="removeLabel(index)"
                      class="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                  <button
                    type="button"
                    @click="addLabel"
                    class="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Label
                  </button>
                </div>
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
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  boardId: String
})

const emit = defineEmits(['update:isOpen', 'save'])

const backgroundColors = [
  '#EFF6FF', // blue-50
  '#F0FDF4', // green-50
  '#FEF2F2', // red-50
  '#FFF7ED', // orange-50
  '#F5F3FF', // purple-50
  '#F8FAFC', // slate-50
]

const settings = ref({
  title: 'Main Board',
  visibility: 'private',
  background: '#EFF6FF',
  labels: [
    { name: 'Bug' },
    { name: 'Feature' },
    { name: 'Enhancement' }
  ]
})

function addLabel() {
  settings.value.labels.push({ name: '' })
}

function removeLabel(index) {
  settings.value.labels.splice(index, 1)
}

function saveSettings() {
  emit('save', settings.value)
  emit('update:isOpen', false)
}
</script> 
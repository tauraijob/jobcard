<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('update:isOpen', false)"></div>
      
      <div class="relative w-full max-w-md bg-white rounded-lg shadow-xl">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            {{ board ? 'Edit Board' : 'Create New Board' }}
          </h2>
          
          <form @submit.prevent="handleSubmit">
            <div class="space-y-4">
              <!-- Board Title -->
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700">Board Title</label>
                <input
                  id="title"
                  v-model="formData.title"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter board title"
                >
              </div>

              <!-- Team Selection -->
              <div>
                <label for="team" class="block text-sm font-medium text-gray-700">Team</label>
                <select
                  id="team"
                  v-model="formData.teamId"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Personal Board</option>
                  <option v-for="team in teams" :key="team.id" :value="team.id">
                    {{ team.name }}
                  </option>
                </select>
              </div>

              <!-- Background Color -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Background</label>
                <div class="space-y-4">
                  <!-- Color Presets -->
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="color in colorPresets"
                      :key="color"
                      type="button"
                      @click="formData.background = color"
                      class="w-8 h-8 rounded-lg border-2 transition-all"
                      :class="[
                        formData.background === color ? 'border-blue-500 scale-110' : 'border-transparent hover:scale-105'
                      ]"
                      :style="{ backgroundColor: color }"
                    />
                    <button
                      type="button"
                      @click="showCustomColor = true"
                      class="w-8 h-8 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 flex items-center justify-center transition-colors"
                      title="Custom Color"
                    >
                      <span class="text-gray-400 hover:text-blue-500">+</span>
                    </button>
                  </div>

                  <!-- Custom Color Input -->
                  <div v-if="showCustomColor" class="space-y-2">
                    <div class="flex items-center space-x-2">
                      <input
                        v-model="formData.background"
                        type="color"
                        class="h-8 w-16 rounded border border-gray-300"
                      >
                      <input
                        v-model="formData.background"
                        type="text"
                        placeholder="#000000"
                        class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                    </div>
                    
                    <!-- Color Gradients -->
                    <div class="space-y-2">
                      <label class="block text-sm font-medium text-gray-600">Gradients</label>
                      <div class="flex flex-wrap gap-2">
                        <button
                          v-for="gradient in gradientPresets"
                          :key="gradient"
                          type="button"
                          @click="formData.background = gradient"
                          class="w-full h-12 rounded-lg border-2 transition-all"
                          :class="[
                            formData.background === gradient ? 'border-blue-500' : 'border-transparent hover:border-gray-300'
                          ]"
                          :style="{ background: gradient }"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Visibility -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Visibility</label>
                <div class="mt-2 space-y-2">
                  <div class="flex items-center">
                    <input
                      id="private"
                      v-model="formData.visibility"
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
                      v-model="formData.visibility"
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
                :disabled="!formData.title.trim()"
              >
                {{ board ? 'Save Changes' : 'Create Board' }}
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
import { useTeamStore } from '~/store/team'

const props = defineProps({
  isOpen: Boolean,
  board: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:isOpen', 'save'])
const teamStore = useTeamStore()
const teams = computed(() => teamStore.teams)

const showCustomColor = ref(false)

const colorPresets = [
  '#F8FAFC', // slate-50
  '#F1F5F9', // slate-100
  '#E2E8F0', // slate-200
  '#F3F4F6', // gray-100
  '#E5E7EB', // gray-200
  '#F1F5F9', // slate-100
  '#EFF6FF', // blue-50
  '#F0F9FF', // sky-50
  '#F5F3FF', // purple-50
  '#FFFFFF', // white
]

const gradientPresets = [
  'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)', // slate
  'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)', // darker slate
  'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)', // gray
  'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)', // slate blue
  'linear-gradient(135deg, #eff6ff 0%, #93c5fd 100%)', // blue
  'linear-gradient(135deg, #f5f3ff 0%, #c4b5fd 100%)', // purple
]

const formData = ref({
  title: '',
  teamId: '',
  background: '#EFF6FF',
  visibility: 'private',
  favorite: false
})

onMounted(() => {
  if (props.board) {
    formData.value = {
      ...props.board,
      teamId: props.board.teamId || ''
    }
  } else {
    formData.value = {
      title: '',
      teamId: '',
      background: '#EFF6FF',
      visibility: 'private',
      favorite: false
    }
  }
})

function handleSubmit() {
  emit('save', {
    ...formData.value,
    id: props.board?.id || `board-${Date.now()}`,
    updatedAt: new Date().toISOString(),
    createdAt: props.board?.createdAt || new Date().toISOString()
  })
  emit('update:isOpen', false)
}
</script>

<style scoped>
/* Override default color input appearance */
input[type="color"] {
  -webkit-appearance: none;
  padding: 0;
  border: none;
  border-radius: 4px;
  overflow: hidden;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}
</style> 
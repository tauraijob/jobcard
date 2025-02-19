<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('update:isOpen', false)"></div>
      
      <div class="relative w-full max-w-md bg-white rounded-lg shadow-xl">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            {{ task ? 'Edit Task' : 'New Task' }}
          </h2>
          
          <form @submit.prevent="handleSubmit">
            <div class="space-y-4">
              <!-- Title -->
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                <input
                  id="title"
                  v-model="formData.title"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter task title"
                >
              </div>

              <!-- Priority -->
              <div>
                <label for="priority" class="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  id="priority"
                  v-model="formData.priority"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">None</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <!-- Due Date -->
              <div>
                <label for="dueDate" class="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  id="dueDate"
                  v-model="formData.dueDate"
                  type="date"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
              </div>

              <!-- Labels -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Labels</label>
                <div class="mt-2 flex flex-wrap gap-2">
                  <button
                    v-for="label in availableLabels"
                    :key="label"
                    type="button"
                    @click="toggleLabel(label)"
                    :class="[
                      'px-3 py-1 rounded-full text-sm font-medium',
                      formData.labels.includes(label)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600'
                    ]"
                  >
                    {{ label }}
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
                :disabled="!formData.title.trim()"
              >
                {{ task ? 'Save Changes' : 'Create Task' }}
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
  task: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:isOpen', 'save'])

const formData = ref({
  title: '',
  priority: '',
  dueDate: '',
  labels: []
})

const availableLabels = ['Bug', 'Feature', 'Enhancement', 'Documentation', 'Design']

onMounted(() => {
  if (props.task) {
    formData.value = {
      title: props.task.title || '',
      priority: props.task.priority || '',
      dueDate: props.task.dueDate || '',
      labels: props.task.labels || []
    }
  } else {
    // Reset form for new task
    formData.value = {
      title: '',
      priority: '',
      dueDate: '',
      labels: []
    }
  }
})

function toggleLabel(label) {
  const index = formData.value.labels.indexOf(label)
  if (index === -1) {
    formData.value.labels.push(label)
  } else {
    formData.value.labels.splice(index, 1)
  }
}

function handleSubmit() {
  const taskData = {
    id: props.task?.id || `task-${Date.now()}`,
    ...formData.value
  }
  
  emit('save', taskData)
  emit('update:isOpen', false)
}
</script> 